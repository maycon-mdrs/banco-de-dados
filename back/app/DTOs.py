from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel

class PessoaDTO(BaseModel):
    cpf: str
    nome: str
    telefone: str
    email: str

    class Config:
        orm_mode = True

class LoginDTO(BaseModel):
    email: str
    password: str

class ReservaDTO(BaseModel):
    id_reserva: int
    valor_multa: float
    valor_seguro: float
    valor_categoria: float
    valor_desconto: float
    data_hora_retirada: datetime
    data_hora_devolucao: datetime
    data_hora_devolucao_efetiva: Optional[datetime]
    status: str
    tem_motorista: int
    veiculo_codigo: str
    motorista_funcionario_pessoa_cpf: Optional[str]
    locatario_pessoa_cpf: str

class ReservaCreateDTO(BaseModel):
    # valor_multa: Optional[float]
    # valor_seguro: Optional[float]
    # valor_categoria: Optional[float]
    # valor_desconto: Optional[float]
    data_hora_retirada: datetime
    data_hora_devolucao: datetime
    status: str
    tem_motorista: int
    veiculo_codigo: str
    locatario_pessoa_cpf: str
    
class VeiculoDTO(BaseModel):
    codigo: str
    pais: str
    estado: str
    cidade: str
    disponibilidade: int
    categoria_veiculo_tipo_categoria: str

class CategoriaVeiculoDTO(BaseModel):
    tipo_categoria: str
    tipo_veiculo: str
    quant_passageiros: int
    quant_bagagens: int

class PrecoDTO(BaseModel):
    data: datetime
    multa_hora: float
    preco_dia: float
    categoria_veiculo_tipo_categoria: str