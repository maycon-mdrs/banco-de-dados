export interface IVeiculo {
    codigo: string,
    pais: string,
    estado: string,
    cidade: string,
    disponibilidade: number,
    categoria_veiculo_tipo_categoria: string
}

export interface ICategoriaVeiculo {
    tipo_categoria: string,
    tipo_veiculo: string,
    quant_passageiros: number,
    quant_bagagens: number,
    data: Date,
    multa_hora: number,
    preco_dia: number
}