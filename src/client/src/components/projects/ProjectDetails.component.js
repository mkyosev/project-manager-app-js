import projectService from '../../services/projectService';
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import MembersList from './common/MembersList.component';
import '../../css/common.css'
import { NotificationManager } from 'react-notifications';

function ProjectDetails() {
    let [project, setProject] = useState({});
    let [isAuthor, setIsAuthor] = useState(false);
    let { id } = useParams();

    let magicButton = useRef(null);
    let [modal, setModal] = useState(false);


    let [membersList, setMembersList] = useState([]);
    let [submitted, setSubmitted] = useState(false);

    let membersListTemp = [];

    let [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setIsMounted(true);
        if (isMounted) {
            let tempProjectMembers = [];
            projectService.getProjectById(id)
                .then(data => {
                    if (isMounted) {
                        if (data.name) {
                            data.groupMembers.forEach(x => {
                                membersListTemp.push(<li key={x._id}>{x.fullName} | {x.email}</li>);
                                tempProjectMembers.push(x._id);
                            });
                            tempProjectMembers.push(data.author);
                            setProject(data);
                            setMembersList(membersListTemp);
                            if (authUtils.getUser() && authUtils.getUser()._id === data.author) {
                                setIsAuthor(true);
                            }
                        }
                    }

                })
                .catch(err => {
                    NotificationManager.error("An error has occured loading the project!", "Error!");
                })


        }


        return () => setIsMounted(false);
        // eslint-disable-next-line
    }, [isMounted]);


    function deleteHandler(e) {
        if (isAuthor) {
            magicButton.current.click();
            projectService.deleteProject(id)
                .then(data => {
                    setSubmitted(true);
                    NotificationManager.success("Successfully deleted!");
                })
                .catch(() => {
                    NotificationManager.error("Failed to delete project!", "Error!");
                })
        } else {
            return;
        }
    }

    function onCloseClick() {
        setModal(false);
        magicButton.current.click();
    }

    function deleteModal() {
        setModal(true);
        magicButton.current.click();
    }

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-12 col-xl-8 col-left">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="glide details">
                                <div className="glide__track" data-glide-el="track">
                                    <ul className="glide__slides">
                                        <li className="glide__slide">
                                            <img alt="detail" src={project.imageUrl}
                                                className="responsive border-0 border-radius img-fluid mb-3 description-image" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="col-12 col-md-12 col-xl-4 col-right">
                    <div className="card mb-4">
                        <div className="position-absolute card-top-buttons">
                            <button className="btn btn-header-light icon-button">
                                <i className="simple-icon-refresh"></i>
                            </button>
                        </div>
                        <div className="card-body">

                            <p className="mb-3">
                                {project.description}
                            </p>

                            <div className="mb-3">
                                <div className="post-icon mr-3 d-inline-block"><i
                                    className="iconsminds-add-user mr-1"></i> <span>{project.groupMembers ? project.groupMembers.length + 1 : '1 Member'} Members, Author: {project.author ? project.author.fullName : ''}</span></div>
                            </div>

                            <div className="mb-3">
                                <MembersList membersList={membersList} />
                            </div>

                            <div className="mb-3">
                                {isAuthor
                                    ?
                                    <div role="group" className="d-flex justify-content-center">
                                        <Link type="button" style={{ marginRight: '10px' }} to={`/projects/tasks/${project._id}`} className="btn btn-info mb-1">Project Tasks</Link>
                                        <Link type="button" style={{ marginRight: '10px' }} to={`/projects/edit/${project._id}`} className="btn btn-warning mb-1">Edit Project</Link>
                                        {/* <Link type="button" style={{ marginRight: '10px', width: '160px' }} to={`/projects/details/${project._id}`} onClick={deleteHandler} className="btn btn-danger">Delete Project</Link> */}
                                        <input type="button" style={{ marginRight: '10px' }} value="Delete Project" onClick={deleteModal} className="btn btn-danger mb-1" />
                                    </div>
                                    :
                                    <div role="group" className="d-flex justify-content-center">
                                        <Link type="button" style={{ marginRight: '10px' }} to={`/projects/tasks/${project._id}`} className="btn btn-info mb-1">Project Tasks</Link>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {submitted ? <Navigate to={{ pathname: `/projects/public` }} /> : ''}

            {/* modal */}
            <button type="button" className="btn btn-outline-primary" data-toggle="modal"
                data-target="#modal" id="magicButton" ref={magicButton} style={{ display: 'none' }}>
            </button>
            {/* {submitted ? <Navigate to={{ pathname: `/projects/public` }} /> : ''} */}
            {/* style={modal ? { display: 'block', paddingRight: '17px' } : { display: 'none' }} */}
            <div className="modal fade" id="modal" tabIndex={-1} role="dialog" aria-hidden="true" style={modal ? { display: 'block' } : { display: 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Project</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this project?</p>
                        </div>
                        <div className="modal-footer">
                            <label className="form-group has-float-label mb-4">
                                <button to="/" type="button" className="btn btn-danger mb-1"
                                    onClick={deleteHandler}>DELETE</button>
                            </label>
                            <label className="form-group has-float-label mb-4">

                                <button to="/" type="button" className="btn btn-info mb-1"
                                    onClick={onCloseClick}>Cancel</button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetails;
