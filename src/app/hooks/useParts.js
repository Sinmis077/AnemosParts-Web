import { useQuery } from '@tanstack/react-query';
import { partService } from '../services/partService';
import { formatError } from '@/app/utils/errorformatter.js';

export function useParts(ids) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['parts', ids],
        queryFn: async() => {
					if(!ids) {
						const response = await partService.findAll()
						return response.data;
					}
					else {
						const response = await partService.findAllByIds(ids)
						return response.data;
					}
        },
        staleTime: 5 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000
    })

    return {
        catalog: data ? data.parts : [],
        isLoading,
        error: formatError(error),
    }
}

export function usePart(id) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['part'],
		queryFn: async() => {
			const response = await partService.find(id)
			return response.data;
		},
		staleTime: 0,
		enabled: !!id
	})

	return {
		part: data ? data : {},
		isLoading,
		error: formatError(error),
	}
}