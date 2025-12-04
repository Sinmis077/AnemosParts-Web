import { api } from "./api";

export const partService = {
    findAll: () => api.get('/parts'),
}