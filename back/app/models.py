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
    pessoa_cpf: str
    cep: str
    rua: str
    numero: str
    cidade: str

class Funcionario(BaseModel):
    pessoa_cpf: str

class Gerente(BaseModel):
    status_disponibilidade: bool
    funcionario_pessoa_cpf: str

class Motorista(BaseModel):
    funcionario_pessoa_cpf: str

class Locatario(BaseModel):
    pessoa_cpf: str = Field(..., foreign_key="Pessoa.cpf")
