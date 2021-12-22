function MembersList(props) {
    return (
        <ul>
            {props.membersList.length > 0
                ? props.membersList
                : <li>No members are added to this project</li>
            }
        </ul>
    );
}

export default MembersList;