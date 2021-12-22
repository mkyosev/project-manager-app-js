import { useState, useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom';
import projectService from '../../services/projectService'
import authUtils from '../../utils/authUtils';
import MembersList from './common/MembersList.component';
import { NotificationManager } from 'react-notifications';

function EditProject() {
    let [project, setProject] = useState({});
    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [imageUrl, setImageUrl] = useState('');
    let [isPublic, setIsPublic] = useState(false);
    let [member, setMember] = useState('');
    let [submitted, setSubmitted] = useState(false);

    let [membersList, setMembersList] = useState([]);

    let { id } = useParams();
    let membersListTemp = [];

    useEffect(() => {
        let tempProjectMembers = [];

        projectService.getProjectById(id)
            .then(data => {
                if (data.name) {
                    data.groupMembers.forEach(x => {
                        membersListTemp.push(<li key={x._id}>{x.fullName} | {x.email} | <button type="submit" className="btn btn-danger btn-sm" onClick={removeMemberHandler}>X</button></li>);
                        tempProjectMembers.push(x._id);
                    });
                    tempProjectMembers.push(data.author);
                }
                setProject(data);
                setMembersList(membersListTemp);
                setName(data.name);
                setDescription(data.description);
                setImageUrl(data.imageUrl);
                setIsPublic(data.public);
                if (!authUtils.getUser() || authUtils.getUser()._id !== data.author) {
                    setSubmitted(true);
                } else {
                }

            })
            .catch(err => {
                console.log(err);
                NotificationManager.error("An error has occured loading the project!", "Error!");
            })
        // eslint-disable-next-line
    }, []);


    function addMemberHandler(e) {
        e.preventDefault();
        let temp = [];
        let countMembers = membersList.length;
        projectService.addMemberToProject(id, member)
            .then(project => {
                console.log(project);
                if (countMembers === project.groupMembers.length) {
                    NotificationManager.error("User is already added!", "Error!");
                } else {
                    if (project.name) {
                        project.groupMembers.forEach(x => {
                            temp.push(<li key={x._id}>{x.fullName} | {x.email} | <button type="submit" className="btn btn-danger btn-sm" onClick={removeMemberHandler}>X</button></li>);
                        });
                    }
                    setMembersList(temp);
                    NotificationManager.success(`Successfully added ${member}`);
                }
            })
            .catch(err => {
                console.log(err)
                NotificationManager.error("An error has occured while adding a member to your porject!", "Error!");
            });
        e.target.parentElement.previousSibling.querySelector('input').value = '';
    }

    function removeMemberHandler(e) {
        e.preventDefault();

        let emailToRemove = e.target.parentElement.textContent.split(' | ')[1];
        let temp = [];
        projectService.removeMemberFromProject(id, emailToRemove)
            .then((project) => {
                if (project.name) {
                    project.groupMembers.forEach(x => {
                        temp.push(<li key={x._id}>{x.fullName} | {x.email} <button type="submit" className="btn btn-danger btn-sm" onClick={removeMemberHandler}>X</button></li>);
                    });
                }
                setMembersList(temp);
            });
    }

    function editProjectHandler(e) {
        e.preventDefault();

        const data = {
            name,
            description,
            imageUrl,
            public: isPublic
        }

        projectService.editProject(id, data)
            .then(project => {
                setSubmitted(true);
            })

    }

    function isPublicHandler(e) {
        if (e.target.id === 'public') {
            setIsPublic(true);
        } else {
            setIsPublic(false);
        }
    }

    return (
        <div className="row h-100">
            <div className="col-12 col-md-10 mx-auto my-auto">
                <div className="card auth-card">
                    <div className="position-relative image-side ">

                        <p className=" text-white h2">MAGIC IS IN THE DETAILS</p>

                        <p className="white mb-0">
                            Please use your credentials to login.
                            <br />If you are not a member, please
                            <Link to="/user/register" className="white"> register</Link>.
                        </p>
                    </div>
                    <div className="form-side">
                        <h6 className="mb-4">Edit Project</h6>
                        <form id="edit-form" onSubmit={editProjectHandler}>
                            <label className="form-group has-float-label mb-4">
                                <span>Project Name</span>
                                <input type="text" className="form-control" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>

                            <label className="form-group has-float-label mb-4">
                                <span>Description</span>
                                <input type="text" className="form-control" placeholder="Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </label>

                            <label className="form-group has-float-label mb-4">
                                <span>Logo URL</span>
                                <input type="text" className="form-control" placeholder="Logo URL" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                            </label>

                            <div className="form-group mb-4" onClick={isPublicHandler}>
                                {project.public
                                    ? <>
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="public" name="visibility"
                                                className="custom-control-input" defaultChecked />
                                            <label className="custom-control-label" htmlFor="public">Public</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="private" name="visibility"
                                                className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="private">Private</label>
                                        </div>
                                    </>
                                    : <>
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="public" name="visibility"
                                                className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="public">Public</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="private" name="visibility"
                                                className="custom-control-input" defaultChecked />
                                            <label className="custom-control-label" htmlFor="private">Private</label>
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-info mb-1" type="submit">EDIT</button>
                            </div>

                            <label className="form-group has-float-label mb-4">
                            </label>
                            <label className="form-group has-float-label mb-4">
                            </label>

                            <label className="form-group has-float-label mb-4">
                                <span>Add Member</span>
                                <input type="text" className="form-control" placeholder="Member Email" name="member" value={member} onChange={(e) => setMember(e.target.value)} />
                            </label>

                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-success mb-1" type="submit" onClick={addMemberHandler}>ADD</button>
                            </div>

                            <label className="form-group has-float-label mb-4">
                            </label>

                            <label className="form-group has-float-label mb-8">
                                Members:
                                <MembersList membersList={membersList} />
                            </label>


                        </form>
                    </div>
                </div>
            </div>
            {submitted ? <Navigate to={{ pathname: `/projects/details/${project._id}` }} /> : ''}
        </div>
    );
}
export default EditProject;