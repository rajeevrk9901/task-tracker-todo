import axios from "axios";
import { useContext } from "react";
// import env from "../env";




const api = axios.create({
    baseURL: 'https://task-tracker-zzuz.onrender.com/api/',
    headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});



export default api;
