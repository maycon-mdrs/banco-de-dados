import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider/useAuth";

/**
 * Componente que define rotas privadas baseadas na autenticação do usuário.
 * Se o usuário estiver autenticado (possuir um email que contém "@admin"), permite o acesso às rotas aninhadas (Outlet),
 * caso contrário, redireciona para a página de login.
 */
export function PrivateRoutesAdmin () {
    const auth = useAuth();

    return auth.email && auth.email.includes('@admin') ? <Outlet/> : <Navigate to='/login'/>; 
}

/* https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c */