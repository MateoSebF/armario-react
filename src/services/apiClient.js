import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Cookie': `authToken=${document.cookie}`
    }
});

export default apiClient;