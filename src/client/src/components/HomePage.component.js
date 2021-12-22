import { Link } from 'react-router-dom'
import authUtils from '../utils/authUtils';
function HomePage() {

    let user = authUtils.getUser();

    return (
        <div className="row h-100">
            <div className="col-12 col-md-10 mx-auto my-auto">
                <div className="card auth-card">
                    <div className="position-relative image-side ">
                        <p className=" text-white h2">MAGIC IS IN THE DETAILS</p>
                    </div>
                    <div className="form-side">
                        <h2 className="mb-4">Free Project Manager</h2>
                        <h5 classname="mb-4">A free and open source Project Manager built using MERN stack.</h5>
                        <h5 classname="mb-4">You can create as many projects as you want. Have them private or public for everyone to see or not. Each project has
                            it's own board which only the author and project members can edit. Each card when clicked on brings up a comments window.</h5>
                        <h5 classname="mb-4">Collaborate with as many people as needed by adding them to your project using their email.</h5>

                        <h3 classname="mb-4">Sounds good?</h3>
                        <Link type="button" style={{ marginRight: '10px' }} to={`/projects/public`} className="btn btn-info mb-1">View Projects</Link>
                        {user === null

                            ?
                            <Link type="button" style={{ marginRight: '10px' }} to={`/user/register`} className="btn btn-info mb-1">Get Started</Link>
                            : 
                            <Link type="button" style={{ marginRight: '10px' }} to={`/projects/create`} className="btn btn-info mb-1">Create Project</Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;