import { useQuery } from '@tanstack/react-query';
import { modelService } from '../services/modelService';
import { formatError } from '@/app/utils/errorformatter.js';

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
        error: formatError(error),
    }    
}