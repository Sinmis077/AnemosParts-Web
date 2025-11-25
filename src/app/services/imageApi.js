import axios from "axios";

export const imageApi = axios.create({
  baseURL: window.ANEMOS_CONFIG?.apiUrl || import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
