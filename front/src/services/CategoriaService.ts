import { ICategoriaVeiculo, IVeiculo } from '@/interfaces/IVeiculos';
import { Api } from '@/services/api';

export async function get_categoria_veiculo(categoriaId: number) {
    try {
        const request = await Api.get(`/categorias/${categoriaId}/veiculos`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_all_categorias() {
    try {
        const request = await Api.get('/categorias');
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function create_categoria(data: IVeiculo) {
    try {
        const request = await Api.post('/categorias', data);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}