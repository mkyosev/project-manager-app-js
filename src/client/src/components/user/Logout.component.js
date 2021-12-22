import authUtils from "../../utils/authUtils";
import { useEffect } from 'react'


function Logout() {

    useEffect(() => {
        authUtils.logout();
    });
    return (
        <>
            
        </>
    );
}

export default Logout;