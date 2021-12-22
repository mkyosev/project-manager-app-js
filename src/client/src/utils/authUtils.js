

function isLoggedIn() {
    const jwt = localStorage.getItem('user');
    if (jwt) {
        return true;
    } else { return false; }
}

function logout(){
    const jwt = localStorage.getItem('user');
    if (jwt) {
        localStorage.removeItem('user');
    }
}

function getUser(){
    return JSON.parse(localStorage.getItem('user'));
}

const authUtils = {
    isLoggedIn,
    logout,
    getUser
}

export default authUtils;