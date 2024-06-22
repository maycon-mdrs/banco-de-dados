import { get_all_categorias, create_categoria } from "@/services/CategoriaService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useCategoriaQuery() {
    return useQuery({
        queryFn: get_all_categorias,
        queryKey: ['categorias-data'],
    });
}

export function useCategoriaMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: create_categoria,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['categorias-data'] });
        }, 
    });

    return mutate;
}