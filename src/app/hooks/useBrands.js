import { useQuery } from '@tanstack/react-query';
import { brandService } from '../services/brandService';
import { formatError } from '@/app/utils/errorformatter.js';

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
        error: formatError(error),
    }    
}