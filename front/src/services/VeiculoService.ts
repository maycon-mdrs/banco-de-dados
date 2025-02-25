import { IVeiculo } from '@/interfaces/IVeiculos';
import { Api } from '@/services/api';

export async function get_veiculo(placa_veiculo: string) {
    try {
        const request = await Api.get(`/veiculos/${placa_veiculo}`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_all_veiculos() {
    try {
        const request = await Api.get('/veiculos');
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function create_veiculo(data: IVeiculo) {
    try {
        const request = await Api.post('/veiculos', data);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_veiculos_por_categoria(tipo_categoria: number) {
    try {
        const request = await Api.get(`/categorias/${tipo_categoria}/veiculos`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_preco(categoria_veiculo_tipo_categoria: number) {
    try {
        const request = await Api.get(`/preco/${categoria_veiculo_tipo_categoria}`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_preco_categoria(categoriaId: number) {
    try {
        const request = await Api.get(`/Categorias/${categoriaId}/Preco`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}