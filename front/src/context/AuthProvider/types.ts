export interface IUser {
    email?: string;
    token?: string;
}

/**
 * Interface que estende a interface IUser e adiciona métodos e propriedades relacionados ao contexto de autenticação.
 */
export interface IContext extends IUser {
    /**
     * Função assíncrona que realiza a autenticação do usuário com base no email e senha fornecidos.
     * @param email O email do usuário.
     * @param password A senha do usuário.
     * @returns Uma Promise que é resolvida quando a autenticação é bem-sucedida e rejeitada quando não é.
     */
    authenticate: (email: string, password: string) => Promise<void>;

    /**
     * Função que efetua o logout do usuário, encerrando sua sessão.
     */
    logout: () => void;
}

export interface IAuthProvider {
    /**
     * Os elementos JSX (React) que serão envolvidos pelo provedor de autenticação.
     */
    children: JSX.Element;
}
