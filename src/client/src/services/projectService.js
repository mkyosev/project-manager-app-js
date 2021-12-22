import { API_URL } from '../config';
import authUtils from '../utils/authUtils';

async function getAllPublic() {
    const result = await fetch(`${API_URL}/projects/all`);
    const data = result.json();
    return data;
}

function getProjectById(id) {
    return fetch(`${API_URL}/projects/${id}`)
        .then(res => res.json());

}

function addMemberToProject(projectId, email) {
    return fetch(`${API_URL}/projects/addmember`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authUtils.getUser().token
        },
        body: JSON.stringify({
            projectId,
            email
        })
    })
        .then(res => res.json());
}

function removeMemberFromProject(projectId, email) {
    return fetch(`${API_URL}/projects/removemember`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authUtils.getUser().token
        },
        body: JSON.stringify({
            projectId,
            email
        })
    })
        .then(res => res.json());
}

function editProject(projectId, data) {
    try {
        const postData = {
            projectId,
            ...data
        }
        return fetch(`${API_URL}/projects/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': authUtils.getUser().token
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json());
    } catch (err) {
        console.log(err);
    }
}


function deleteProject(projectId) {
    const postData = {
        projectId
    }
    return fetch(`${API_URL}/projects/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authUtils.getUser().token
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json());
}

function createProject(data) {
    return fetch(`${API_URL}/projects/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authUtils.getUser().token
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 200) {
                console.log(res.body);
                return res.json();
            } else {
                console.log(res);
                return res;
            }
        });
}

const projectService = {
    getAllPublic,
    getProjectById,
    addMemberToProject,
    removeMemberFromProject,
    editProject,
    createProject,
    deleteProject
}

export default projectService;