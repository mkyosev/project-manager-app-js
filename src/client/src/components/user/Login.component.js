import { useState } from 'react';
import authService from '../../services/authService';
import { Link, Navigate } from 'react-router-dom'
import authUtils from '../../utils/authUtils';
import { NotificationManager } from 'react-notifications';


function Login() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [submitted, setSubmitted] = useState(false);
    function HandleLogin(e) {
        e.preventDefault();

        (async () => {
            await authService.loginUser(email, password);
            if (authUtils.getUser()) {
                NotificationManager.success(`Welcome, ${email}!`, 'Login successful');
                setSubmitted(true);

            } else {
                NotificationManager.error(`Invalid credentials!`);
            }
        })();


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
                        <h6 className="mb-4">Login</h6>
                        <form id="login-form" onSubmit={HandleLogin}>
                            <label className="form-group has-float-label mb-4">
                                <span>E-mail</span>
                                <input className="form-control" type="email" placeholder="Enter email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </label>

                            <label className="form-group has-float-label mb-4">
                                <span>Password</span>
                                <input className="form-control" type="password" placeholder="Enter password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </label>
                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-info mb-1" type="submit">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {submitted ? <Navigate to={{ pathname: `/projects/public` }} /> : ''}
        </div>
    );
}

export default Login;