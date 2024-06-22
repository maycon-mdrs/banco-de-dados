import { Api } from '@/services/api';
import { IReserva } from '@/interfaces/IReserva';

export async function get_reserva(id: number) {
    try {
        const request = await Api.get(`/reservas/${id}`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_reservas_por_pessoa(cpf: string) {
    try {
        const request = await Api.get(`/reservas/locatario/${cpf}`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_all_reservas() {
    try {
        const request = await Api.get('/reservas');
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function create_reserva(data: IReserva) {
    try {
        const request = await Api.post('/reservas', data);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}