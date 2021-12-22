import projectService from '../../services/projectService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/common.css';
import { NotificationManager } from 'react-notifications';

function PublicProjects() {
    let [projects, setProjects] = useState({});

    useEffect(() => {

        try {
            projectService.getAllPublic()
                .then(data => {
                    setProjects(data);
                })
                .catch(err => {
                    NotificationManager.error("Failed to load public projects!", "Error!");
                })
        } catch (err) {
            NotificationManager.error("Failed to load public projects!", "Error!");
        }

    }, []);

    let renderProjects = [];

    if (projects.length > 0) {
        projects.forEach((x, i) => {
            let push = (
                <div className="col-12 col-lg-6 mb-5" key={x._id}>
                    <div className="card flex-row listing-card-container">
                        <div className="w-40 position-relative">
                            <Link to={`/projects/details/${x._id}`}>
                                <img className="maximum-img-size-projects card-img-left" src={x.imageUrl} alt={x.name} />
                                {/* <span className="badge badge-pill badge-theme-1 position-absolute badge-top-left">NEW</span> */}
                            </Link>
                        </div>
                        <div className="w-60 d-flex align-items-center">
                            <div className="card-body">
                                <Link to={`/projects/details/${x._id}`}>
                                    <h5 className="mb-3 listing-heading ellipsis">{x.name}</h5>
                                </Link>
                                <p className="listing-desc text-muted ellipsis">
                                    {x.description.length > 172 ? x.description.substring(0, 172).trim() + '...' : x.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
            renderProjects.push(push);
        })
    }


    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <h1>Public Projects</h1>
                    <div className="separator mb-5"></div>
                </div>
            </div>
            <div className="row">
                {renderProjects.length > 0 ? renderProjects : <h3>There are no public projects available right now!</h3>}
            </div>
        </div>
    );
}

export default PublicProjects;


// {Array.from({ length: 4 }).map((_, idx) => (
//     <Col key={idx}>
//         <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src="https://www.maya-project.eu/pluginfile.php/1/theme_herald/homeblock4image/1616997405/project_results.jpg" />
//             <Card.Body>
//                 <Card.Title>Public Project {idx + 1}</Card.Title>
//                 <Card.Text>
//                     This is a longer card with supporting text below as a natural
//                     lead-in to additional content. This content is a little bit longer.
//                 </Card.Text>
//                 <Button href={`/projects/details/`}>Details</Button>
//             </Card.Body>
//         </Card>
//     </Col>
// ))}