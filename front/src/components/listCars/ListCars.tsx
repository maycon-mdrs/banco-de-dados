import { CardCar } from '@/components/cardCar/CardCar';
import { useCategoriaQuery } from '@/hooks/useCategoria';
import { useVeiculoQuery } from '@/hooks/useVeiculo';
import { ICategoriaVeiculo, IVeiculo } from '@/interfaces/IVeiculos';

export function ListCars() {
    const { data: categorias } = useCategoriaQuery();
    const { data: veiculos } = useVeiculoQuery();

    if (!categorias || !veiculos) {
        return null; // Tratamento opcional para dados ainda carregando
    }

    // Filtrar categorias com base na disponibilidade dos veículos
    const categoriasDisponiveis = categorias.filter((categoria: ICategoriaVeiculo) => {
        // Encontrar veículos associados a esta categoria que estão disponíveis
        const veiculosCategoria = veiculos.filter((veiculo: IVeiculo) => veiculo.categoria_veiculo_tipo_categoria === categoria.tipo_categoria);
        return veiculosCategoria.some((veiculo: IVeiculo) => veiculo.disponibilidade === 1); // Verificar se algum veículo está disponível
    });

    return (
        <div className='flex flex-wrap justify-between'>
            {categoriasDisponiveis.map((categoria: ICategoriaVeiculo, index: number) => {
                const description = {
                    preco_dia: categoria.preco_dia,
                    tipo_veiculo: categoria.tipo_veiculo,
                    quant_passageiros: categoria.quant_passageiros,  
                    quant_bagagens: categoria.quant_bagagens
                };

                return (
                    <div key={index} className='flex w-full justify-center sm:w-full md:w-1/3 lg:w-1/3 p-2'>
                        <CardCar
                            image={"https://static.vecteezy.com/ti/vetor-gratis/p3/2099131-super-carro-icone-plano-estilo-elegancia-carro-esporte-conceito-unico-moderno-realista-cartoon-arte-design-generico-luxo-automovel-carro-apresentacao-visao-lateral-ilustracaoial-vetor.jpg"}
                            title={categoria.tipo_categoria}
                            description={description}
                        />
                    </div>
                );
            })}
        </div>
    );
}
