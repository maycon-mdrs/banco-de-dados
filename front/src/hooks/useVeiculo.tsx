import { get_all_veiculos, create_veiculo } from "@/services/VeiculoService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useVeiculoQuery() {
    return useQuery({
        queryFn: () => get_all_veiculos(),
        queryKey: ['veiculo-data'],
    });
}

export function useVeiculoMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: create_veiculo,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['veiculo-data'] });
        }, 
    });

    return mutate;
}

