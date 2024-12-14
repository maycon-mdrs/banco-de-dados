import { Api } from '@/services/api';

export async function get_pessoa(cpf: string) {
    try {
        const request = await Api.get(`/pessoas/${cpf}`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
