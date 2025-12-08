import { api } from './api';

export const brandService = {
    findAll: () => api.get('/brands'),
}