import { useQuery } from '@tanstack/react-query';
import { partService } from '../services/partService';
import { formatError } from '@/app/utils/errorformatter.js';

export function useParts(ids) {
	if(!ids) { ids = [] }
    const { data, isLoading, error } = useQuery({
        queryKey: ['parts', ids],
        queryFn: async() => {
					if(ids.length === 0) {
						const response = await partService.findAll(ids)
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