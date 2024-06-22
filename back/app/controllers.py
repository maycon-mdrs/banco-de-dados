from fastapi import APIRouter, Depends, HTTPException
from app.DTOs import LoginDTO, PessoaDTO, ReservaDTO
from app.models import Pessoa
from app.services import cadastrar_pessoa, get_pessoa, get_reserva, login_service
from pydantic import BaseModel, Field
from typing import Dict

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

""" ROTA RESERVA """
@router.get("/reservas/{id_reserva}", response_model=ReservaDTO)
def read_reserva(id_reserva: int):
    reserva = get_reserva(id_reserva)
    if reserva is None:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")
    return reserva

@router.post("/reservas/", response_model=int)
def create_reserva(reserva_data: Dict):
    reserva_id = create_reserva(reserva_data)
    return reserva_id