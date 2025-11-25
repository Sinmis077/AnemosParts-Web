import axios from "axios";

export const api = axios.create({
    baseURL: window.ANEMOS_CONFIG?.apiUrl || import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json' 
    }
});