import { api } from './api';

export const modelService = {
  findAll: () => api.get("/models"),
};
