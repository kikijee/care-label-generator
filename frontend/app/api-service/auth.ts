import axios from 'axios';


const API_URL = "https://localhost:8000";

const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    "withCredentials": true 
});

