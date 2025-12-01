import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { modelService } from "../services/modelService";
import toast from "react-hot-toast";

export const useModels = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['models'],
        queryFn: async() => {
            const response = await modelService.findAll()
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000
    })

    return {
        models: data ? data.models : [],
        isLoading,
        error: error?.response.data
    }    
}

export const useCreateModel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (model) => {
            const response = await modelService.create(model)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['models'] })
            toast.success('Model added successfully!')
        },
        onError: (error) => {
            toast.error(`Failed to make model \n\r${error.message}`)
        }
    })
}

export const useUpdateModel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, model}) => {
            const response = await modelService.update(id, model)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['models'] })
            toast.success("Model updated successfully!")
        },
        onError: (error) => {
            toast.error(`Failed to update model \n\r${error.message}`)
        }
    })
}

export const useDeleteModel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const response = await modelService.delete(id)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['models'] })
            toast.success("Model deleted successfully!")
        },
        onError: (error) => {
            toast.error(`Failed to delete model \n\r${error.message}`)
        }
    })
}