import { Api } from "@/services/api";
import { IUser } from "./types";

/**
 * Armazena os detalhes do usuário no localStorage.
 * @param user As informações do usuário a serem armazenadas. Pode ser null para remover o usuário do armazenamento.
 */
export function setUserLocalStorage (user: IUser | null) {
    localStorage.setItem("u", JSON.stringify(user));
}

/**
 * Obtém as informações do usuário armazenadas no localStorage.
 * @returns As informações do usuário armazenadas, ou null se não houver usuário armazenado.
 */
export function getUserLocalStorage () {
    const json = localStorage.getItem("u");

    if (!json) return null;

    const user = JSON.parse(json);
    return user ?? null;
}

/**
 * Realiza uma solicitação de login ao servidor.
 * @param email O email do usuário para login.
 * @param password A senha do usuário para login.
 * @returns As informações do usuário se o login for bem-sucedido, ou null se ocorrer um erro.
 */
export async function LoginRequest (email: string, password: string) {
    try {
        const request = await Api.post("login", { email, password });
        console.log('request.data: ', request.status);
        return request.data;
    } catch (error) {
        return null;
        console.error(error);
    }
}

export async function RegisterRequest ({ email, password }: { email: string, password: string }) {
    try {
        const request = await Api.post("register", { email, password });
        console.log('request.data: ', request.status);
    } catch (error) {
        throw error;
        console.error(error);
    }
}