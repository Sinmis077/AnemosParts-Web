import { useMutation } from "@tanstack/react-query";
import { imageService } from "../services/imageService";
import toast from "react-hot-toast";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (image) => {
            const response = await imageService.upload(image)
            return response.data
        },
        onSuccess: () => {
            toast.success('Image uploaded successfully!')
        },
        onError: (error) => {
            toast.error(`Failed to upload image \n\r${error.message}`)
        }
    })
}

export const useUploadImages = () => {
    return useMutation({
        mutationFn: async (images) => {
            const response = await imageService.uploadMultiple(images)
            return response.data
        },
        onSuccess: (data) => {
            const count = data?.imageUrls?.length || 0;
            toast.success(`${count} image${count !== 1 ? 's' : ''} uploaded successfully!`)
        },
        onError: (error) => {
            toast.error(`Failed to upload images \n\r${error.message}`)
        }
    })
}