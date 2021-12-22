import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import projectService from '../../services/projectService';
import { NotificationManager } from 'react-notifications';


function NewProject() {


    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [imageUrl, setImageUrl] = useState('');
    let [isPublic, setIsPublic] = useState(true);
    let [submitted, setSubmitted] = useState(false);
    let [project, setProject] = useState({});

    async function createProject(e) {
        e.preventDefault();

        let postData = {
            name,
            description,
            imageUrl,
            public: isPublic
        }

        let error = 0;

        if (name.length === 0) {
            NotificationManager.error('Name is required!');
            error++;
        } else if (name.length > 0 && name.length < 3) {
            NotificationManager.error('Name must be at least 3 characters long!');
            error++;
        }

        if (description.length === 0) {
            NotificationManager.error('Description is required!');
            error++;
        } else if (description.length > 1024) {
            NotificationManager.error(`Description can be maximum 1024 characters! Current: ${description.length}`);
            error++;
        }

        if (imageUrl.length === 0) {
            NotificationManager.error('Logo URL is required!');
            error++;
        }


        if (error === 0) {
            projectService.createProject(postData)
                .then((project) => {
                    NotificationManager.success(`Successfully created project ${project.name}!`);
                    setProject(project);
                    setSubmitted(true);
                })
                .catch((err) => {
                    NotificationManager.error(`CreateProject fatal error!`);
                });
        }
    }

    function isPublicHandler(e) {
        if (e.target.id === 'public') {
            setIsPublic(true);
            // console.log(true);
        } else {
            setIsPublic(false);
            // console.log(false);
        }
    }

    return (
        // <div className="auth-wrapper">
        //     <div className="auth-inner">
        //         <form name="create-project-form" id="create-project-form">
        //             <h3>Create Project</h3>
        //             <div className="form-group">
        //                 <label>Project Name</label>
        //                 <input type="text" className="form-control" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} />
        //             </div>

        //             <div className="form-group">
        //                 <label>Description</label>
        //                 <input type="text" className="form-control" placeholder="Description" name="description" onChange={(e) => setDescription(e.target.value)} />
        //             </div>

        //             <div className="form-group">
        //                 <label>Logo URL</label>
        //                 <input type="text" className="form-control" placeholder="Logo URL" name="imageUrl" onChange={(e) => setImageUrl(e.target.value)} />
        //             </div>

        //             <div className="form-group" style={{ marginTop: '10px', textAlign: 'center' }} onClick={isPublicHandler}>
        //                 <label style={{ marginRight: '10px' }}>Public</label>
        //                 <input type="radio" id="public" name="visibility" value="Public" style={{ marginRight: '10px' }} />
        //                 <label style={{ marginRight: '10px' }}>Private</label>
        //                 <input type="radio" id="private" name="visibility" value="Private" defaultChecked />
        //             </div>

        //             <div style={{ textAlign: 'center' }}>
        //                 <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '10px' }} onClick={createProject}>Create</button>
        //             </div>
        //         </form>
        //     </div>
        //     {submitted ? <Navigate to={{ pathname: `/` }} /> : ''}
        // </div>
        <div className="row h-100">
            <div className="col-12 col-md-10 mx-auto my-auto">
                <div className="card auth-card">
                    <div className="position-relative image-side ">

                        <p className=" text-white h2">MAGIC IS IN THE DETAILS</p>

                        <p className="white mb-0">
                            <br />Create project.
                        </p>
                    </div>
                    <div className="form-side">
                        <h6 className="mb-4">Create Project</h6>
                        <form id="create-form" onSubmit={createProject}>
                            <label className="form-group has-float-label mb-4">
                                <span>Project Name</span>
                                <input type="text" className="form-control" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} />
                            </label>

                            <label className="form-group has-float-label mb-4">
                                <span>Description</span>
                                <input type="text" className="form-control" placeholder="Description" name="description" onChange={(e) => setDescription(e.target.value)} />
                            </label>

                            <label className="form-group has-float-label mb-4">
                                <span>Logo URL</span>
                                <input type="text" className="form-control" placeholder="Logo URL" name="imageUrl" onChange={(e) => setImageUrl(e.target.value)} />
                            </label>

                            <div className="form-group mb-4" onChange={isPublicHandler}>
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
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-success btn-lg btn-shadow" type="submit">CREATE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {submitted ? <Navigate to={{ pathname: `/projects/details/${project._id}` }} /> : ''}
        </div>
    );
}
export default NewProject;