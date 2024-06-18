from pydantic import BaseModel

class PessoaDTO(BaseModel):
    cpf: int
    nome: str
    telefone: str
    email: str

    class Config:
        orm_mode = True

class LoginDTO(BaseModel):
    email: str
    password: str
