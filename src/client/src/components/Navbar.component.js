import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import authUtils from '../utils/authUtils'

function Menu() {

    let links;
    let [user, setUser] = useState({});
    let navigate = useNavigate();

    function logoutHandler() {
        navigate('/');
        authUtils.logout()
        setUser({});
    }

    if (authUtils.isLoggedIn()) {
        if (Object.keys(user).length === 0) {
            setUser(authUtils.getUser());
        }
        links = (
            <div className="navbar-right">
                <div className="header-icons d-inline-block align-middle">
                    <div className="position-relative d-none d-sm-inline-block">
                        <Link to="/projects/public" className="header-icon btn btn-empty">
                            <i className="iconsminds-box-with-folders d-block"></i>
                            <span>Public Projects</span>
                        </Link>
                        <Link to="/projects/create" className="header-icon btn btn-empty">
                            <i className="iconsminds-add d-block"></i>
                            <span>Create Project</span>
                        </Link>
                    </div>
                </div>
                <div className="user d-inline-block">
                    <button className="btn btn-empty p-0" type="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <span className="name">{user.fullName}</span>
                        <span>
                            <img alt="Profile" src="/img/profiles/profile.png" />
                        </span>
                    </button>

                    <div className="dropdown-menu dropdown-menu-right mt-3">
                        <Link className="dropdown-item" to="/user/profile">Profile</Link>
                        <Link className="dropdown-item" to="#" onClick={logoutHandler}>Logout</Link>
                    </div>
                </div>
            </div>
        );
    } else {
        links = (
            // <Navbar.Collapse className="justify-content-end">
            //     <Link className="nav-link" to="/projects/public">Public Projects</Link>
            //     <Link className="nav-link" to="/user/login">Login</Link>
            //     <Link className="nav-link" to="/user/register">Register</Link>
            // </Navbar.Collapse>
            <div className="navbar-right">
                <div className="header-icons d-inline-block align-middle">
                    <div className="position-relative d-none d-sm-inline-block">
                        <Link to="/projects/public" className="header-icon btn btn-empty">
                            <i className="iconsminds-box-with-folders d-block"></i>
                            <span>Public Projects</span>
                        </Link>
                        <Link to="/user/login" className="header-icon btn btn-empty">
                            <i className="iconsminds-key-lock d-block"></i>
                            <span>Login</span>
                        </Link>
                        <Link to="/user/register" className="header-icon btn btn-empty">
                            <i className="iconsminds-add-user d-block"></i>
                            <span>Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <nav className="navbar fixed-top">
            <div className="d-flex align-items-center navbar-left">
                <Link to="/" className="navbar-logo d-none d-md-block">
                    <span className="logo d-none d-xs-block"></span>
                    <span className="logo-mobile d-block d-xs-none"></span>
                </Link>
                <div>
                    Project Manager
                </div>
            </div>
            {links}
        </nav>
    );
};

export default Menu;