import { api } from './api';

export const accountService = {
	update: (id, data) => api.put(`/accounts/${id}`, data),

	getOrders: () => api.get('/accounts/me/orders'),
};