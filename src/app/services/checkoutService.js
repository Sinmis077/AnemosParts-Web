import { api } from "@/app/services/api.js";

export const checkoutService = {
    checkout: (request) => api.post(`/checkout`, request),
}