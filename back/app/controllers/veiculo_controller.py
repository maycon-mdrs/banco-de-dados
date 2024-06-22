from fastapi import APIRouter, HTTPException
from app.services.veiculo_service import VeiculoService
from app.DTOs import CategoriaVeiculoCreateDTO, CategoriaVeiculoDTO, PrecoDTO, VeiculoDTO

router = APIRouter()
veiculo_service = VeiculoService()

@router.get("/veiculos", response_model=list[VeiculoDTO], tags=["Veiculo"])
def read_all_veiculos():
    veiculos = veiculo_service.get_all_veiculos()
    if not veiculos:
        raise HTTPException(status_code=404, detail="Nenhum veículo encontrado")
    return veiculos

@router.get("/veiculos/{placa_veiculo}", response_model=VeiculoDTO, tags=["Veiculo"])
def read_veiculo_by_id(id_veiculo: str):
    veiculo = veiculo_service.get_veiculo(id_veiculo)
    if veiculo is None:
        raise HTTPException(status_code=404, detail="Veículo não encontrado")
    return veiculo


@router.get("/categorias/{tipo_categoria}/veiculos", response_model=list[VeiculoDTO], tags=["Veiculo"])
def read_veiculos_by_categoria(tipo_categoria: str):
    veiculos = veiculo_service.get_veiculos_por_categoria(tipo_categoria)
    if not veiculos:
        raise HTTPException(status_code=404, detail="Nenhum veículo encontrado para a categoria especificada")
    return veiculos

@router.post("/veiculos", response_model=VeiculoDTO, tags=["Veiculo"])
async def add_veiculo(veiculo: VeiculoDTO):
    created_veiculo = veiculo_service.create_veiculo(veiculo)
    if created_veiculo:
        return created_veiculo
    else:
        raise HTTPException(status_code=500, detail="Failed to add Veiculo")

@router.put("/veiculos/{codigo}", response_model=VeiculoDTO, tags=["Veiculo"])
def update_veiculo(codigo: str, veiculo: VeiculoDTO):
    updated_veiculo = veiculo_service.update_veiculo(codigo, veiculo)
    if updated_veiculo:
        return updated_veiculo
    else:
        raise HTTPException(status_code=500, detail="Failed to update Veiculo")

@router.delete("/veiculos/{codigo}", response_model=dict, tags=["Veiculo"])
def delete_veiculo(codigo: str):
    if veiculo_service.delete_veiculo(codigo):
        return {"message": f"Veiculo {codigo} deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail=f"Failed to delete Veiculo {codigo}")