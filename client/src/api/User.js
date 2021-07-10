import axios from 'axios';

export const addUser = (username, password) => {
    return axios.post('/api/user/register', {
        username,
        password
    });
};

export const signInUser = (username, password) => {
    return axios.post('/api/user/signin', {
        username,
        password
    });
};

export const signOutUser = () => {
    return axios.get('/api/user/signout', { withCredentials: true });
};

export const checkAuth = () => {
    return axios.get('/api/user/checkAuth', { withCredentials: true });
};

export const checkAdmin = () => {
    return axios.get('/api/user/checkAdmin', { withCredentials: true });
};
