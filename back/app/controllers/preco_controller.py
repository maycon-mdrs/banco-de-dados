from fastapi import APIRouter, HTTPException
from app.DTOs import PrecoDTO
from app.services.preco_service import PrecoService

router = APIRouter()
preco_service = PrecoService()

@router.post("/precos", response_model=PrecoDTO, tags=["Preco"])
async def add_preco(preco: PrecoDTO):
    created_preco = preco_service.create_preco(preco)
    if created_preco:
        return created_preco
    else:
        raise HTTPException(status_code=500, detail="Failed to add Preco")
