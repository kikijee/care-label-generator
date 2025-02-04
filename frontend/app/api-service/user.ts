import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const userAxios = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    "withCredentials": true 
});

export async function signUpUser(body: any) {
    try {
        const response = await userAxios.post('/api/user',body);
        return response;
    } catch (error: any) {
        console.error("Error during sign up:", error);
        return error.response;
    }
}