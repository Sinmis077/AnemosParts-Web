import { api } from "./api";

export const partService = {
    findAll: () => api.get('/parts'),

    findAllFull: () => api.get('/parts/full'),

    create: (part) => api.post('/parts', part),

    update: (id, part) => api.put(`/parts/${id}`, part),
    
    delete: (id) => api.delete(`/parts/${id}`)
}