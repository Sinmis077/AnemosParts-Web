import { api } from "./api";

export const modelService = {
  findAll: () => api.get("/models"),

  create: (model) => api.post("/models", model),

  update: (id, model) => api.put(`/models/${id}`, model),

  delete: (id) => api.delete(`/models/${id}`),
};
