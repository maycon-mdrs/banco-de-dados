import { create_reserva, get_all_reservas, get_reserva, get_reservas_por_pessoa } from "@/services/ReservaService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useAllReservaQuery() {
    return useQuery({
        queryFn: get_all_reservas,
        queryKey: ['reserva-data'],
    });
}

export function useReservaByCpfQuery(cpf: string) {
    return useQuery({
        queryFn: () => get_reservas_por_pessoa(cpf),
        queryKey: ['reserva-data-cpf'],
    });
}

export function useReservaMutation() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: create_reserva,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['reserva-data'] });
        }, 
    });

    return mutate;
}