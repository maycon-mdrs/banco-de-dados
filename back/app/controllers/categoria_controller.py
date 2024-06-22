from fastapi import APIRouter, HTTPException
from app.services.categoria_service import CategoriaService
from app.DTOs import CategoriaVeiculoCreateDTO, CategoriaVeiculoDTO, PrecoDTO, VeiculoDTO

router = APIRouter()
categoria_service = CategoriaService()

@router.get("/categorias", response_model=list[CategoriaVeiculoCreateDTO], tags=["CategoriaVeiculo"])
def read_all_categorias():
    categorias = categoria_service.get_all_categorias()
    if not categorias:
        raise HTTPException(status_code=404, detail="Nenhuma categoria encontrada")
    return categorias

@router.get("/preco/{categoria_veiculo_tipo_categoria}", response_model=list[PrecoDTO], tags=["CategoriaVeiculo"])
def read_preco_by_categoria(categoria_veiculo_tipo_categoria: str):
    preco = categoria_service.get_preco(categoria_veiculo_tipo_categoria)
    if not preco:
        raise HTTPException(status_code=404, detail="Preço não encontrado para a categoria especificada")
    return preco

@router.post("/categorias", response_model=CategoriaVeiculoCreateDTO, tags=["CategoriaVeiculo"])
async def add_categoria_preco(categoria_preco: CategoriaVeiculoCreateDTO):
    created_categoria = categoria_service.create_categoria_preco(categoria_preco)
    if created_categoria:
        return created_categoria
    else:
        raise HTTPException(status_code=500, detail="Failed to add Categoria and Preco")

@router.put("/categorias/{tipo_categoria}", response_model=CategoriaVeiculoCreateDTO, tags=["CategoriaVeiculo"])
def update_categoria_veiculo(tipo_categoria: str, categoria_veiculo: CategoriaVeiculoCreateDTO):
    updated_categoria = categoria_service.update_categoria_preco(tipo_categoria, categoria_veiculo)
    if updated_categoria:
        return updated_categoria
    else:
        raise HTTPException(status_code=500, detail="Failed to update CategoriaVeiculo")

@router.delete("/categorias/{tipo_categoria}", response_model=dict, tags=["CategoriaVeiculo"])
def delete_categoria_veiculo(tipo_categoria: str):
    if categoria_service.delete_categoria_veiculo(tipo_categoria):
        return {"message": f"categoria de veículo ({tipo_categoria}) foi deletado com successo"}
    else:
        raise HTTPException(status_code=500, detail=f"Failed to delete categoria de veículo ({tipo_categoria})")

