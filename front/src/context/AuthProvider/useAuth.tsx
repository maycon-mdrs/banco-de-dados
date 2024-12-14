import { useContext } from "react";
import { AuthContext } from ".";

/**
 * Um hook que permite o acesso ao contexto de autenticação.
 * @returns O contexto de autenticação obtido do AuthContext. Isso permite que os componentes que usam esse hook tenham acesso ao estado de autenticação e às funcionalidades relacionadas.
 */
export function useAuth () {
    const context = useContext(AuthContext);
    return context;
}
