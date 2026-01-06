import {useMutation} from "@tanstack/react-query";
import {checkoutService} from "@/app/services/checkoutService.js";
import toast from "react-hot-toast";

export function useCheckout() {
    return useMutation({
        mutationFn: async (checkoutRequest) => {
            const response = await checkoutService.checkout(checkoutRequest);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success('Redirecting you to stripe....');
            setTimeout(() => window.location.href=data.url, 2000);
        },
    })
}