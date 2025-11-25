import axios from "axios";

export const imageApi = axios.create({
  baseURL: window.ANEMOS_CONFIG?.apiUrl || import.meta.env.VITE_API_URL || "http://null/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
