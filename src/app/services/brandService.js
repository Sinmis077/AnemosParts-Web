import { api } from "./api";

export const brandService = {
    findAll: () => api.get('/brands'),

    create: (brand) => api.post('/brands', brand),

    update: (id, brand) => api.put(`/brands/${id}`, brand),
    
    delete: (id) => api.delete(`/brands/${id}`)
}