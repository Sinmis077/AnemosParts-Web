import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import process from "react"

export const useParts = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { data, isLoading, error } = useQuery({
        queryKey: ['parts'],
        queryFn: async() => {
            const response = await axios.get(`${apiUrl}/parts`)
            return response.data;
        }
    })

    return {
        catalog: data,
        isLoading: isLoading,
        error: error
    }    
}