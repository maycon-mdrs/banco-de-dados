from fastapi import APIRouter, Depends, HTTPException
from app.DTOs import LoginDTO, PessoaDTO
from app.models import Pessoa
from app.services import cadastrar_pessoa, get_pessoa, login_service
from pydantic import BaseModel, Field

router = APIRouter()

@router.get("/pessoas/{cpf}", response_model=PessoaDTO)
def read_pessoa_controller(cpf: int):
    pessoa = get_pessoa(cpf)
    if pessoa is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return pessoa

@router.post("/login/", response_model=PessoaDTO)
def login_controller(login: LoginDTO):
    pessoa = login_service(login.email, login.password)

    if pessoa is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return pessoa

@router.post("/cadastro_usuario/", response_model=PessoaDTO)
def cadastrar_pessoa_controller(pessoa: Pessoa):
    pessoa = cadastrar_pessoa(pessoa)

    if pessoa is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return pessoa