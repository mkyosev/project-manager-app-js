import { Link } from 'react-router-dom'
import '../../css/common.css';

function UserProfileProjectCard({
    data, own
}) {


    return (
        <div className="col-sm-6 col-lg-6 col-xl-4 col-12 mb-4">
            <div className="card">
                <div className="position-relative">
                    <Link to={`/projects/details/${data._id}`}>
                        <img className="card-img-top card-img-top-top" src={data.imageUrl} alt="Card cap" />
                    </Link>
                    {
                        own
                            ? <span className="badge badge-pill badge-theme-1 position-absolute badge-top-left">CREATED</span>
                            : <span className="badge badge-pill badge-secondary position-absolute badge-top-left">SHARED</span>
                    }
                </div>
                <div className="card-body">
                    <a href="Pages.Details.html">
                        <h6 className="mb-3 listing-heading ellipsis">
                            {data.name}
                        </h6>
                    </a>
                    <footer>
                        <p className="text-muted text-small mb-0 font-weight-light">
                            Created: {new Date(data.createdAt).toDateString()}</p>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default UserProfileProjectCard;