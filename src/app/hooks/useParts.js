import { useQuery } from "@tanstack/react-query";
import { partService } from "../services/partService";

export function useParts() {
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