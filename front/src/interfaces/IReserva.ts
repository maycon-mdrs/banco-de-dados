export interface IReserva {
    id_reserva?: number | null;
    valor_multa?: number | null;
    valor_seguro?: number | null;
    valor_categoria?: number | null;
    valor_desconto?: number | null;
    data_hora_retirada?: Date | string | null;
    data_hora_devolucao?: Date | string | null;
    data_hora_devolucao_efetiva?: string | null;
    status?: string | null;
    tem_motorista?: number | null;
    veiculo_codigo?: string | null;
    motorista_funcionario_pessoa_cpf?: string | null;
    locatario_pessoa_cpf?: string | null;
}

export interface IReservaCreate {
    data_hora_retirada?: Date | string
    data_hora_devolucao?: Date | string
    status?: string
    tem_motorista?: number
    veiculo_codigo?: string
    motorista_funcionario_pessoa_cpf?: string | null
    locatario_pessoa_cpf?: string
}