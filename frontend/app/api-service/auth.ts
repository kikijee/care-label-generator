import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    "withCredentials": true 
});

export async function signInUser(body: any) {
    try {
        const response = await authAxios.post('/api/auth/login',body);
        return response;
    } catch (error: any) {
        console.error("Error during sign in:", error);
        return error.response;
    }
}

export const verify = async () => {
    try {
        const response = await authAxios.get('/api/auth/verify');
        return response;
    } catch (error: any) {
        console.error('Error during verification:', error);
        return error.response;
    }
};

export const logout = async () => {
    try {
      const response = await authAxios.delete('/api/auth/logout');
      return response;
    } catch (error: any) {
      console.error("Logout failed:", error);
      return error.response;
    }
  };

