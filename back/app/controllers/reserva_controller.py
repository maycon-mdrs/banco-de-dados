from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException
from app.services.reserva_service import ReservaService
from app.DTOs import ReservaCreateDTO, ReservaDTO

router = APIRouter()
reserva_service = ReservaService()

@router.get("/reservas/{id_reserva}", response_model=ReservaDTO, tags=["Reserva"])
def read_reserva_by_id(id_reserva: int):
    reserva = reserva_service.get_reserva_by_id(id_reserva)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")
    return reserva

@router.get("/reservas", response_model=list[ReservaDTO], tags=["Reserva"])
def read_all_reservas():
    reservas = reserva_service.get_all_reservas()
    if not reservas:
        raise HTTPException(status_code=404, detail="Nenhuma reserva encontrada")
    return reservas

@router.get("/reservas/locatario/{cpf}", response_model=list[ReservaDTO], tags=["Reserva"])
def read_reservas_by_cpf(cpf: str):
    reservas = reserva_service.get_reservas_by_cpf(cpf)
    if not reservas:
        raise HTTPException(status_code=404, detail="Nenhuma reserva encontrada para o CPF especificado")
    return reservas

@router.get("/reservas/{id_reserva}/multa", response_model=float, tags=["Reserva"])
def calcular_multa_hora(id_reserva: int):
    multa = reserva_service.calcular_multa_hora(id_reserva)
    return multa

@router.put("/reservas/{id_reserva}/status", response_model=ReservaDTO, tags=["Reserva"])
def alterar_status_reserva(id_reserva: int, novo_status: str):
    status_alterado = reserva_service.alterar_status_reserva(id_reserva, novo_status)
    if not status_alterado:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")
    return status_alterado

@router.post("/reservas", response_model=ReservaDTO, tags=["Reserva"])
def criar_reserva(reserva: ReservaCreateDTO):
    reserva_criada = reserva_service.criar_reserva(reserva)
    if not reserva_criada:
        raise HTTPException(status_code=400, detail="Erro ao criar reserva")
    return reserva_criada

@router.put("/reservas/{id_reserva}", response_model=ReservaDTO, tags=["Reserva"])
def alterar_status_reserva(id_reserva: int, novo_status: str, data_hora_devolucao_efetiva: datetime):
    try:
        # Chamada ao serviço para alterar o status da reserva
        reserva_atualizada = reserva_service.devolucao_veiculo(id_reserva, novo_status, data_hora_devolucao_efetiva)
        
        if not reserva_atualizada:
            raise HTTPException(status_code=404, detail=f"Reserva com id {id_reserva} não encontrada ou já foi concluída anteriormente.")
        
        return reserva_atualizada
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar reserva: {str(e)}")