import {api} from './api';

export const partService = {
    findAll: () => api.get('/parts'),

    findAllByIds: (ids) => api.get('/parts/ids', {params: {ids}}),

    find: (id) => api.get(`/parts/${id}`)
}