from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.services.beneficio_service import BeneficioService
from app.DTOs import BeneficioDTO, BeneficioCreateDTO

router = APIRouter()
beneficio_service = BeneficioService()

@router.post("/beneficio/", response_model=BeneficioDTO, tags=["Beneficio"])
def create_beneficio(beneficio: BeneficioCreateDTO):
    beneficio_criado = beneficio_service.create_beneficio(beneficio)
    if not beneficio_criado:
        raise HTTPException(status_code=400, detail="Erro ao criar benefício")
    return beneficio_criado

@router.get("/beneficio/{beneficio_id}", response_model=BeneficioDTO, tags=["Beneficio"])
def read_beneficio(beneficio_id: int):
    beneficio = beneficio_service.get_beneficio(beneficio_id)
    if not beneficio:
        raise HTTPException(status_code=404, detail="Benefício não encontrado")
    return beneficio

@router.get("/beneficio/", response_model=List[BeneficioDTO], tags=["Beneficio"])
def read_all_beneficios(skip: int = 0, limit: int = 10):
    beneficios = beneficio_service.get_all_beneficios(skip, limit)
    if not beneficios:
        raise HTTPException(status_code=404, detail="Nenhum benefício encontrado")
    return beneficios
