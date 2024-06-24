from pydantic import BaseModel, Field
from datetime import date, datetime

class Pessoa(BaseModel):
    cpf: str # pk
    nome: str # NN
    telefone: str # NN
    email: str # NN
    password: str # NN

class Endereco(BaseModel):
    endereco: str # pk NN
    pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf") # pk NN
    cep: str # NN
    rua: str # NN
    numero: str # NN
    cidade: str # NN

class Funcionario(BaseModel):
    pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf") # pk NN

class Gerente(BaseModel):
    funcionario_pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf") # pk NN

class Motorista(BaseModel):
    funcionario_pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf") # pk NN
    status_disponibilidade: int # NN

class Locatario(BaseModel):
    pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf") # pk NN

class Veiculo(BaseModel):
    codigo: str # pk NN
    pais: str # NN
    estado: str # NN
    cidade: str # NN
    disponibilidade: int # NN
    categoria_veiculo_tipo_categoria: str = Field(..., foreign_key="CategoriaVeiculo.tipo_categoria") # NN

class CategoriaVeiculo(BaseModel):
    tipo_categoria: str # pk NN
    tipo_veiculo: str # NN
    quant_passageiros: int # NN
    quant_bagagens: int # NN

class Preco(BaseModel):
    data: datetime # pk NN
    multa_hora: float # NN
    preco_dia: float # NN
    categoria_veiculo_tipo_categoria: str = Field(..., foreign_key="CategoriaVeiculo.tipo_categoria") # NN

class Reserva(BaseModel):
    id_reserva: int # pk NN
    valor_multa: float # NN
    valor_seguro: float # NN
    valor_categoria: float # NN
    valor_desconto: float # NN
    data_hora_retirada: datetime # NN
    data_hora_devolucao: datetime # NN
    data_hora_devolucao_efetiva: datetime # NN
    status: str # NN
    tem_motorista: int # NN 
    veiculo_codigo: str = Field(..., foreign_key="Veiculo.codigo") # NN
    motorista_funcionario_pessoa_cpf: str = Field(..., foreign_key="Motorista.funcionario_pessoa_cpf") # pode ser null
    locatario_pessoa_cpf: str = Field(..., foreign_key="Locatario.pessoa_cpf") # NN

""" EXTRA """
class SeguroLocacao(BaseModel):
    codigo_seguro: int # pk NN
    descricao: str # NN
    tipo_seguro: str # NN
    valor_dia: float # NN
    locatario_pessoa_cpf: str = Field(..., foreign_key="Locatario.pessoa_cpf") # pode ser null

class SeguroLocacao_has_Reserva(BaseModel):
    seguro_locacao_codigo_seguro: int = Field(..., foreign_key="SeguroLocacao.codigo_seguro") # pk NN
    reserva_idreserva: int = Field(..., foreign_key="Reserva.id_reserva") # pk NN

class Plano(BaseModel):
    id_plano: int # pk NN
    valor: float # NN
    locatario_pessoa_cpf: str = Field(..., foreign_key="Locatario.pessoa_cpf") # pk NN

class Beneficio(BaseModel):
    beneficio: str # pk NN
    plano_id_plano: int = Field(..., foreign_key="Plano.id_plano") # pk NN