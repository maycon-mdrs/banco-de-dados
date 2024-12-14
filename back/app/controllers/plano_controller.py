from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.services.plano_service import PlanoService
from app.DTOs import PlanoDTO, PlanoCreateDTO

router = APIRouter()
plano_service = PlanoService()

@router.post("/plano/", response_model=PlanoDTO, tags=["Plano"])
def create_plano(plano: PlanoCreateDTO):
    plano_criado = plano_service.create_plano(plano)
    if not plano_criado:
        raise HTTPException(status_code=400, detail="Erro ao criar plano")
    return plano_criado

@router.get("/plano/{plano_id}", response_model=PlanoDTO, tags=["Plano"])
def read_plano(plano_id: int):
    plano = plano_service.get_plano(plano_id)
    if not plano:
        raise HTTPException(status_code=404, detail="Plano não encontrado")
    return plano

@router.get("/plano/", response_model=List[PlanoDTO], tags=["Plano"])
def read_all_planos(skip: int = 0, limit: int = 10):
    planos = plano_service.get_all_planos(skip, limit)
    if not planos:
        raise HTTPException(status_code=404, detail="Nenhum plano encontrado")
    return planos
