import { createContext, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, setUserLocalStorage, getUserLocalStorage } from "./util";

// Criação de um contexto de autenticação com valores iniciais vazios.
export const AuthContext = createContext<IContext>({} as IContext);

/**
 * Componente que provê o contexto de autenticação para a aplicação.
 * @param children Os elementos JSX que serão envolvidos pelo provedor de autenticação.
 */
export function AuthProvider ({ children }: IAuthProvider) {
    const [user, setUser] = useState<IUser>(()=>{
        const user = getUserLocalStorage();
        return user ?? {} as IUser;
    });

    /**
     * Função assíncrona que realiza a autenticação do usuário.
     * @param email O email do usuário.
     * @param password A senha do usuário.
     */
    async function authenticate (email: string, password: string) {
        const response = await LoginRequest(email, password);

        const payload = { cpf: response.cpf, nome: response.nome, telefone: response.telefone, email };

        setUser(payload);
        setUserLocalStorage(payload);
    }

    /**
     * Função que efetua o logout do usuário.
     */
    function logout() {
        setUser({} as IUser);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout  }}>
            {children}
        </AuthContext.Provider>
    )
}
