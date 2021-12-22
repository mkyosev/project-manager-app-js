import { API_URL } from '../config';
import { NotificationManager } from 'react-notifications';
import authUtils from '../utils/authUtils'

async function loginUser(email, password) {
    const post = { email, password };
    try {
        const result = await fetch(`${API_URL}/auth/login`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(post)
            })
        const data = await result.json();
        if (result.status === 201) {
            localStorage.setItem('user', JSON.stringify(data));
        } else {
            console.log(data);
        }
    } catch (err) {
        console.log(err);
    }
}

async function registerUser(fullName, email, password) {
    const post = { fullName, email, password };
    try {
        const result = await fetch(`${API_URL}/auth/register`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(post)
            });
        const data = await result.json();
        if (result.status === 201) {
            localStorage.setItem('user', JSON.stringify(data));
            NotificationManager.success(`Welcome, ${authUtils.getUser().email}!`, 'Registration successful');
        } else {
            //TODO: Error display
            console.log(data);
            NotificationManager.error('User already exists!');
        }
    } catch (err) {
        console.log(err);
    }
}

async function getUserById(userId) {
    const post = { userId };
    try {
        const result = await fetch(`${API_URL}/auth/profile`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(post)
            });
        const data = await result.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}


const authService = {
    loginUser,
    registerUser,
    getUserById
}

export default authService;