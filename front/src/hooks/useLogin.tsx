import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthProvider/useAuth"
import { get_pessoa } from "@/services/PessoaService";
import { RegisterRequest } from "@/context/AuthProvider/util";
import { IRegister } from "@/interfaces/IUser";

/**
 * Hook to retrieve user login data.
 * 
 * @returns {object} - Returns the react-query object with the query status and data.
 * 
 * This hook uses React Query to fetch the user's profile data using the `getProfile` function from the login service.
 */
export function useLoginQuery(cpf: string) {
    return useQuery({
        queryFn: () => get_pessoa(cpf),
        queryKey: ['login-data'],
    });
}

/**
 * Hook to perform user login mutation.
 * 
 * @returns {object} - Returns the react-query object to execute the mutation and manage the state.
 * 
 * This hook uses React Query to perform the login mutation using the `authenticate` function from the authentication context.
 * After a successful mutation, it invalidates the login data query to ensure that updated data is fetched.
 */
export function useLoginMutate() {
    const auth = useAuth();
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => auth.authenticate(email, password),
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['login-data'] });
        }, 
    });

    return mutate;
}

export function useRegisterMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: ({ cpf, nome, telefone, email, password }: IRegister) => RegisterRequest({cpf, nome, telefone, email, password}),
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['login-data'] });
        }, 
    });

    return mutate;
}