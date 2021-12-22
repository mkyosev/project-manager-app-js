import authService from '../../services/authService';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { NotificationManager } from 'react-notifications';
import authUtils from '../../utils/authUtils';

function SignUp() {

    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [repass, setRepass] = useState('');
    let [submitted, setSubmitted] = useState(false);

    function HandleRegister(e) {
        e.preventDefault();

        let error = 0;

        if (fullName.length === 0) {
            NotificationManager.error('Full name is required!');
            error++;
        } else if (fullName.length > 0 && fullName.length < 3) {
            NotificationManager.error('Full name must be at least 3 characters long!');
            error++;
        }

        if (email.length === 0) {
            NotificationManager.error('Email is required!');
            error++;
        } else if (!email.match(/.+@.+\..+/)) {
            NotificationManager.error('Email must be valid!');
            error++;
        }

        if (password.length === 0) {
            NotificationManager.error('Password is required!');
            error++;
        }

        if (password !== repass) {
            NotificationManager.error('Passwords do not match!');
            error++;
        }

        if (error === 0) {
            (async () => {
                await authService.registerUser(fullName, email, password);
                if (authUtils.getUser()) {
                    setSubmitted(true);
    
                }
            })();

        }

    }

    return (
        <div className="row h-100">
            <div className="col-12 col-md-10 mx-auto my-auto">
                <div className="card auth-card">
                    <div className="position-relative image-side ">
                        <p className=" text-white h2">MAGIC IS IN THE DETAILS</p>
                        <p className="white mb-0">
                            Please use this form to register.
                            <br />If you are a member, please
                            <Link to="/user/login" className="white"> login</Link>.
                        </p>
                    </div>
                    <div className="form-side">
                        <Link to="/">
                            <span className="logo-single"></span>
                        </Link>
                        <h6 className="mb-4">Register</h6>

                        <form onSubmit={HandleRegister}>
                            <label className="form-group has-float-label mb-4">
                                <input type="text" className="form-control" placeholder="Full Name" name="fullName" value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                                <span>Full Name</span>
                            </label>
                            <label className="form-group has-float-label mb-4">
                                <input type="email" className="form-control" placeholder="Enter email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <span>E-mail</span>
                            </label>
                            <label className="form-group has-float-label mb-4">
                            <input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                <span>Password</span>
                            </label>
                            <label className="form-group has-float-label mb-4">
                            <input type="password" className="form-control" placeholder="Repeat password" name="repassword" value={repass} onChange={(e) => { setRepass(e.target.value) }} />
                                <span>Repeat Password</span>
                            </label>
                            <div className="d-flex justify-content-end align-items-center">
                                <button className="btn btn-info mb-1" type="submit">REGISTER</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {submitted ? <Navigate to={{ pathname: `/projects/public` }} /> : ''}
        </div>
    );
}

export default SignUp;