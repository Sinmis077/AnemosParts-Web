import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { brandService } from "../services/brandService";
import toast from "react-hot-toast";

export const useBrands = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['brands'],
        queryFn: async() => {
            const response = await brandService.findAll()
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000
    })

    return {
        brands: data ? data.brands : [],
        isLoading,
        error: error?.response.data
    }    
}

export const useCreateBrand = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (brand) => {
            const response = await brandService.create(brand)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] })
            toast.success('Brand added successfully!')
        },
        onError: (error) => {
            toast.error(`Failed to make brand \n\r${error.message}`)
        }
    })
}

export const useUpdateBrand = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, brand}) => {
            const response = await brandService.update(id, brand)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] })
            toast.success("Brand updated successfully!")
        },
        onError: (error) => {
            toast.error(`Failed to update brand \n\r${error.message}`)
        }
    })
}

export const useDeleteBrand = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const response = await brandService.delete(id)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] })
            toast.success("Brand deleted successfully!")
        },
        onError: (error) => {
            toast.error(`Failed to delete brand \n\r${error.message}`)
        }
    })
}