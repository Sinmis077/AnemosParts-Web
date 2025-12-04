import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { partService } from "../services/partService";
import toast from "react-hot-toast";

export const useParts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['parts'],
        queryFn: async() => {
            const response = await partService.findAll()
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000
    })

    return {
        catalog: data ? data.parts : [],
        isLoading,
        error: error?.response.data
    }    
}

export const useFullParts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['fullParts'],
        queryFn: async() => {
            const response = await partService.findAllFull()
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000
    })

    return {
        catalog: data ? data.parts : [],
        isLoading,
        error
    }    
}

export const useCreatePart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (part) => {
            const response = await partService.create(part)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts', 'fullParts'] })
            toast.success('Part added successfully!')
        },
        onError: (error) => {
            toast.error(`Failed to make part \n\r${error.message}`)
        }
    })
}

export const useUpdatePart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, part}) => {
            const response = await partService.update(id, part)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts', 'fullParts'] })
            toast.success("Part updated successfully!")
        },
        onError: (error) => {
            toast.error(`Failed to update part \n\r${error.message}`)
        }
    })
}

export const useDeletePart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const response = await partService.delete(id)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts', 'fullParts'] })
            toast.success("Part deleted successfully!")
        },
        onError: (error) => {
            toast.error(`Failed to delete part \n\r${error.message}`)
        }
    })
}