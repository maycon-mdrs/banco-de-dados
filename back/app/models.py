from pydantic import BaseModel, Field
from datetime import date

class Pessoa(BaseModel):
    cpf: int
    nome: str
    telefone: str
    email: str
    password: str

class Endereco(BaseModel):
    endereco: str
    pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf")
    cep: str
    rua: str
    numero: str
    cidade: str

class Funcionario(BaseModel):
    pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf")

class Gerente(BaseModel):
    status_disponibilidade: bool
    funcionario_pessoa_cpf: str = Field(..., foreign_key="Funcionario.pessoa_cpf")

class Motorista(BaseModel):
    funcionario_pessoa_cpf: str = Field(..., foreign_key="Funcionario.pessoa_cpf")

class Locatario(BaseModel):
    pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf")

class SeguroLocacao(BaseModel):
    codigo_seguro: int
    descricao: str
    tiposeguro: str
    valordia: str
    locatario_pessoa_cpf: str = Field(..., foreign_key="Locatario.pessoa_cpf")

class SeguroLocacao_has_Reserva(BaseModel):
    segurolocacao_codigo_seguro: int = Field(..., foreign_key="SeguroLocacao.codigoseguro")
    reserva_idreserva: int = Field(..., foreign_key="Reserva.idreserva")

class Plano(BaseModel):
    idplano: int
    valor: str
    locatario_pessoa_cpf: str = Field(..., foreign_key="Locatario.pessoa_cpf")

class Beneficio(BaseModel):
    beneficio: str
    plano_idplano: int = Field(..., foreign_key="Plano.idplano")

class Reserva(BaseModel):
    idreserva: int
    valormulta: str
    valorseguro: str
    valorcategoria: str
    valordesconto: str
    datahoraretirada: date
    datahoradevolucao: date
    status: str
    temmotorista: int
    veiculo_codigo: int = Field(..., foreign_key="Veiculo.codigo")
    motorista_funcionario_pessoa_cpf: int = Field(..., foreign_key="Motorista.funcionario_pessoa_cpf")
    locatario_pessoa_cpf: int = Field(..., foreign_key="Locatario.pessoa_cpf")

class Desconto(BaseModel):
    codigodesconto: int
    descricao: str
    datadeexpiracao: str
    valordesconto: str
    reserva_idreserva: int = Field(..., foreign_key="Reserva.idreserva")

class Veiculo(BaseModel):
    codigo: int
    pais: str
    estado: str
    cidade: str
    disponibilidade: str
    categoriaveiculo_tipocategoria: int = Field(..., foreign_key="CategoriaVeiculo.tipocategoria")

class CategoriaVeiculo(BaseModel):
    tipocategoria: int
    tipoveiculo: str
    quantpassageiro: int
    quantbagagens: int

class Preco(BaseModel):
    date: date
    multahora: float
    precodia: float
    categoriaveiculo_tipocategoria: int = Field(..., foreign_key="CategoriaVeiculo.tipocategoria")