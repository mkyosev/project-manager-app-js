import './css/UserProfile.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authUtils from '../../utils/authUtils';
import authService from '../../services/authService';
import UserProfileProjectCard from './UserProfileProjectCard.component';
import { NotificationManager } from 'react-notifications';

function UserProfile() {

    let [user, setUser] = useState({});
    let [ownProjects, setOwnProjects] = useState([]);
    let [otherProjects, setOtherProjects] = useState([]);
    // let user = {};
    // let ownProjects = [];
    // let otherProjects = [];

    let [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (mounted) {
            let tmp = [];
            let tmp2 = [];
            authService.getUserById(authUtils.getUser()._id)
                .then(res => {
                    setUser(res);
                    if (Object.keys(res).length > 0) {
                        res.ownProjects.forEach(p => {
                            tmp.push(<UserProfileProjectCard data={p} key={p._id} own={true} />)
                        });
                    }

                    setOwnProjects(tmp);

                    if (Object.keys(res).length > 0) {
                        res.otherProjects.forEach(p => {
                            tmp2.push(<UserProfileProjectCard data={p} key={p._id} own={false} />)
                        });
                    }

                    setOtherProjects(tmp2);
                })
                .catch(err => {
                    NotificationManager.error("An error has occured retrieving your projects!", "Error!");
                });
        }
        return () => {
            setMounted(false);
        }
    }, [mounted]);

    return (
        <div className="row">
            <div className="col-12">

                <div className="mb-2">
                    <h1>{user.fullName}</h1>
                    <div className="text-zero top-right-button-container">
                        {/* <button type="button"
                            className="btn btn-lg btn-outline-primary dropdown-toggle dropdown-toggle-split top-right-button top-right-button-single"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ACTIONS
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                        </div> */}
                    </div>
                </div>


                <ul className="nav nav-tabs separator-tabs ml-0 mb-5" role="tablist">
                    <li className="nav-item">
                        <Link className="nav-link active" id="first-tab" data-toggle="tab" to="#first" role="tab"
                            aria-controls="first" aria-selected="true">PROFILE</Link>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane show active" id="first" role="tabpanel" aria-labelledby="first-tab">
                        <div className="row">
                            <div className="col-12 col-lg-5 col-xl-4 col-left">
                                <div className="card mb-4">
                                    {/* <div className="position-absolute card-top-buttons">
                                        <button className="btn btn-outline-white icon-button ">
                                            <i className="simple-icon-pencil"></i>
                                        </button>
                                    </div> */
                                    }
                                    <img src="/img/profiles/profile.png" alt="emptyProfile" className="card-img-top" />

                                    <div className="card-body">
                                        <p className="text-muted text-small mb-2">Name</p>
                                        <p className="mb-3">
                                            {user.fullName}
                                        </p>

                                        <p className="text-muted text-small mb-2">Email</p>
                                        <p className="mb-3">{user.email}</p>

                                        <p className="text-muted text-small mb-2">Projects</p>
                                        <p className="mb-3">
                                            Created : {Object.keys(user).length > 0
                                                ? user.ownProjects.length
                                                : 0}
                                        </p>
                                        <p className="mb-3">
                                            Shared : {Object.keys(user).length > 0
                                                ? user.otherProjects.length
                                                : 0}
                                        </p>
                                        <p className="text-muted text-small mb-2">Contact</p>
                                        <div className="social-icons">
                                            <ul className="list-unstyled list-inline">
                                                <li className="list-inline-item">
                                                    <Link to="/"><i className="simple-icon-social-facebook"></i></Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link to="/"><i className="simple-icon-social-twitter"></i></Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link to="/"><i className="simple-icon-social-instagram"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 d-none d-lg-block">
                                    <div className="position-absolute card-top-buttons">
                                        <button className="btn btn-header-light icon-button">
                                            <i className="simple-icon-refresh"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-lg-7 col-xl-8 col-right">
                                <div className="row listing-card-container">
                                    {ownProjects}
                                    {otherProjects}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default UserProfile;