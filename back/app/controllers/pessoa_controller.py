from fastapi import APIRouter, HTTPException
from app.DTOs import LoginDTO, PessoaDTO
from app.models import Pessoa
from app.services.pessoa_service import cadastrar_pessoa, get_pessoa, login_service

router = APIRouter()

@router.get("/pessoas/{cpf}", response_model=PessoaDTO, tags=["Pessoa"])
def read_pessoa_controller(cpf: str):
    pessoa = get_pessoa(cpf)
    if pessoa is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return pessoa

@router.post("/login/", response_model=PessoaDTO, tags=["Pessoa"])
def login_controller(login: LoginDTO):
    pessoa = login_service(login.email, login.password)

    if pessoa is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return pessoa

@router.post("/cadastro_usuario/", response_model=PessoaDTO, tags=["Pessoa"])
def cadastrar_pessoa_controller(pessoa: Pessoa):
    pessoa = cadastrar_pessoa(pessoa)

    if pessoa is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return pessoa