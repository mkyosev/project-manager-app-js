
// import './ProfileProjectCard.css'
function ProfileProjectCard() {



    return (
            <div className="card">
                <h3 className="title">Card 1</h3>
                <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                </div>
                <div className="circle">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle className="stroke" cx="60" cy="60" r="50" />
                    </svg>
                </div>
            </div>
    )
};

export default ProfileProjectCard;