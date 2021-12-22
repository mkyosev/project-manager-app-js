import React, { useEffect, useState, useRef } from 'react'
import Board from 'react-trello'
import { useParams } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import projectService from '../../services/projectService';
import { NotificationManager } from 'react-notifications';


function ProjectDetails() {

    let [project, setProject] = useState({});
    let [projectBoardData, setProjectBoardData] = useState({ lanes: [] });
    let [modal, setModal] = useState(false);
    let [comments, setComments] = useState([]);
    let [newComment, setNewComment] = useState([]);
    let [clickedCardId, setClickedCardId] = useState("");
    let [clickedLaneId, setClickedLaneId] = useState("");
    let magicButton = useRef(null);


    let [canEdit, setCanEdit] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        let tempProjectMembers = [];
        projectService.getProjectById(id)
            .then((res) => {
                if (res.name) {
                    res.groupMembers.forEach(x => {
                        tempProjectMembers.push(x._id);
                    });
                    tempProjectMembers.push(res.author);


                    if (authUtils.getUser() !== null && tempProjectMembers.find(x => x === authUtils.getUser()._id)) {
                        setCanEdit(true);
                    } else {
                        if (res.data.lanes.length > 0) {
                            res.data.lanes.forEach(x => {
                                x.cards.forEach(card => {
                                    card.draggable = false;
                                })
                            })
                        }

                    }
                }
                setProject(res);

                setProjectBoardData(res.data);
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Failed to load project tasks!", "Error!");
            });
        // eslint-disable-next-line
    }, []);

    function onLaneAddHandler(params) {
        try {
            let updatedProject = {
                ...project
            }

            const lane = {
                id: params.id,
                title: params.title,
                orderId: updatedProject.data.lanes.length,
                label: '',
                cards: [],
            }


            updatedProject.data.lanes.push(lane);
            console.log(updatedProject);


            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    //server error add lane
                    console.log(err);
                    NotificationManager.error("An error with the server prevented saving the lane!", "Error!");
                })
        } catch (err) {
            NotificationManager.error("Failed to create lane!", "Error!");
        }
    }

    function onLaneDeleteHandler(laneId) {

        try {
            let updatedProject = {
                ...project
            }
            updatedProject.data.lanes.forEach((x, idx) => {
                if (x.id === laneId) {
                    updatedProject.data.lanes.splice(idx, 1);
                }
            });
            console.log(updatedProject.data.lanes);
            console.log(laneId);


            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented the lane from being deleted!", "Error!");
                })
        } catch (err) {
            NotificationManager.error("Failed to delete lane!", "Error!");
        }
    }

    function handleLaneDragEnd(removedIndex, addedIndex, payload) {
        try {
            console.log(payload);
            let updatedProject = {
                ...project
            }
            let removedLane = updatedProject.data.lanes[removedIndex];
            updatedProject.data.lanes.splice(removedIndex, 1);
            updatedProject.data.lanes.splice(addedIndex, 0, removedLane);

            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented the lane's moving to be saved!", "Error!");
                })

        } catch (err) {
            NotificationManager.error("Failed to move lane!", "Error!");
        }
    }

    function onLaneUpdate(laneId, data) {
        try {
            let updatedProject = {
                ...project
            }

            updatedProject.data.lanes.forEach(x => {
                if (x.id === laneId) {
                    x.title = data.title;
                }
            })

            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented updating lane information!", "Error!");
                })

        } catch (err) {
            NotificationManager.error("Failed to update lane information!", "Error!");
        }
    }

    function onCardClick(cardId, metadata, laneId) {
        console.log(cardId, metadata, laneId);

        try {
            let updatedProject = {
                ...project
            }

            let lane = updatedProject.data.lanes.find(x => x.id === laneId);
            let card = lane.cards.find(x => x.id === cardId);

            if (document.activeElement.tagName !== "TEXTAREA") {
                setModal(true);
                setComments(card.comments);
                setClickedCardId(cardId);
                setClickedLaneId(laneId);
                magicButton.current.click();
            }
            // projectService.editProject(id, updatedProject)
            //     .then(res => {
            //         setProject(res);
            //     })
            //     .catch(err => {
            //         NotificationManager.error("An error with the server prevented comments from being loaded!", "Error!");
            //     })

        } catch (err) {
            console.log(err);
            NotificationManager.error("Failed to load comments!", "Error!");
        }
    }

    function onCardMoveAcrossLanes(fromLaneId, toLaneId, cardId, index) {
        // console.log(fromLaneId, toLaneId, cardId, index);
        try {
            let updatedProject = {
                ...project
            }

            if (fromLaneId === toLaneId) {
                let lane = updatedProject.data.lanes.find(x => x.id === fromLaneId)
                let card = lane.cards.find((x, idx) => x.id === cardId);
                let currIdx = 0;
                lane.cards.forEach((x, idx) => {
                    if (x.id === card.id) {
                        currIdx = idx;
                    }
                });
                lane.cards.splice(currIdx, 1);
                lane.cards.splice(index, 0, card);
            } else {
                let fromLane = updatedProject.data.lanes.find(x => x.id === fromLaneId)
                let toLane = updatedProject.data.lanes.find(x => x.id === toLaneId)
                let card = fromLane.cards.find((x, idx) => x.id === cardId);
                let currIdx = 0;
                fromLane.cards.forEach((x, idx) => {
                    if (x.id === card.id) {
                        currIdx = idx;
                    }
                });
                fromLane.cards.splice(currIdx, 1);
                toLane.cards.splice(index, 0, card);
            }


            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented saving card movement!", "Error!");
                })

        } catch (err) {
            NotificationManager.error("Failed moving card!", "Error!");
        }
    }

    function onCardAdd(card, laneId) {
        try {
            let updatedProject = {
                ...project
            }
            card.comments = [];
            updatedProject.data.lanes.forEach(x => {
                if (x.id === laneId) {
                    x.cards.push(card);
                }
            })

            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented the card from being added!", "Error!");
                })

        } catch (err) {
            NotificationManager.error("Failed to add card!", "Error!");
        }
    }

    function onCardDelete(cardId, laneId) {
        try {
            let updatedProject = {
                ...project
            }

            updatedProject.data.lanes.forEach(x => {
                if (x.id === laneId) {
                    let idx = 0;
                    x.cards.forEach((x, i) => {
                        if (x.id === cardId) {
                            idx = i;
                        }
                    })
                    x.cards.splice(idx, 1);
                }
            })

            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented the card from being deleted!", "Error!");
                })

        } catch (err) {
            NotificationManager.error("Failed deleting card!", "Error!");
        }

    }

    function onCardUpdate(laneId, updatedData) {
        console.log(laneId, updatedData);
        try {
            let updatedProject = {
                ...project
            }

            let lane = updatedProject.data.lanes.find(x => x.id === laneId);
            let card = lane.cards.find(x => x.id === updatedData.id);
            if (updatedData.title !== undefined) {
                card.title = updatedData.title;
            } else if (updatedData.description !== undefined) {
                card.description = updatedData.description;
            } else if (updatedData.label !== undefined) {
                card.label = updatedData.label;
            }
            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented the card from being updated!", "Error!");
                })

        } catch (err) {
            NotificationManager.error("Failed updating card!", "Error!");
        }
    }

    function onCloseClick() {
        setModal(false);
    }

    function onSendClick(e) {
        e.preventDefault();
        try {
            let updatedProject = {
                ...project
            }

            const user = authUtils.getUser();
            let lane = updatedProject.data.lanes.find(x => x.id === clickedLaneId);
            let card = lane.cards.find(x => x.id === clickedCardId);

            card.comments.push({
                fullName: user.fullName,
                comment: newComment,
                date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
            })



            projectService.editProject(id, updatedProject)
                .then(res => {
                    setProject(res);
                    setComments(card.comments);
                    setNewComment("");
                })
                .catch(err => {
                    NotificationManager.error("An error with the server prevented the comment from being saved!", "Error!");
                })

        } catch (err) {
            NotificationManager.error("Failed adding a comment!", "Error!");
        }
    }

    return (

        <>
            {canEdit
                ?
                <Board
                    data={projectBoardData}

                    onLaneAdd={onLaneAddHandler}
                    onLaneDelete={onLaneDeleteHandler}
                    onLaneUpdate={onLaneUpdate}
                    handleLaneDragEnd={handleLaneDragEnd}

                    onCardAdd={onCardAdd}
                    onCardDelete={onCardDelete}
                    onCardUpdate={onCardUpdate}
                    onCardMoveAcrossLanes={onCardMoveAcrossLanes}

                    onCardClick={onCardClick}


                    hideCardDeleteIcon={false}
                    canAddLanes={true}
                    editLaneTitle={true}
                    editable={true}
                    collapsibleLanes={true}
                    draggable={true}
                    style={{ backgroundColor: 'transparent', height: '100%', width: '100%' }} />
                :
                <Board
                    data={projectBoardData}
                    draggable={false}
                    editable={false}
                    hideCardDeleteIcon={true}

                    style={{ backgroundColor: 'transparent', height: '100%', width: '100%' }} />
            }
            <button type="button" className="btn btn-outline-primary" data-toggle="modal"
                data-target="#modal" id="magicButton" ref={magicButton} style={{ display: 'none' }}>
            </button>
            {/* {submitted ? <Navigate to={{ pathname: `/projects/public` }} /> : ''} */}
            {/* style={modal ? { display: 'block', paddingRight: '17px' } : { display: 'none' }} */}
            <div className="modal fade" id="modal" tabIndex={-1} role="dialog" aria-hidden="true" style={modal ? { display: 'block' } : { display: 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Comments</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" onClick={onCloseClick}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {comments ? comments.map((x, id) => <p key={x.date}>({x.date}) {x.fullName}: {x.comment}</p>) : <p>No comments!</p>}
                        </div>
                        <div className="modal-footer">
                            <label className="form-group has-float-label mb-4">
                                <span>Comment</span>
                                <input className="form-control" style={{ width: '350px' }} type="text" placeholder="Comment" name="comment" value={newComment} onChange={(e) => { setNewComment(e.target.value) }} />
                            </label>
                            <label className="form-group has-float-label mb-4">

                                <button to="/" type="button" className="btn btn-success mb-1"
                                    onClick={onSendClick}>Send</button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetails;
