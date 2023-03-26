import axios from "axios";
// import env from "../env";


const api = axios.create({
    baseURL: 'http://localhost:9000/api/',
    headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});



export default api;