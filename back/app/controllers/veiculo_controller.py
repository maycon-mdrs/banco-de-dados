from fastapi import APIRouter, HTTPException
from app.services.veiculo_service import get_all_veiculos, get_veiculo, get_categoria_veiculo, get_preco, get_all_categorias, get_veiculos_por_categoria, get_veiculos_em_categorias
from app.DTOs import CategoriaVeiculoDTO, PrecoDTO, VeiculoDTO

router = APIRouter()

@router.get("/veiculos", response_model=list[VeiculoDTO], tags=["Veiculo"])
def read_all_veiculos():
    veiculos = get_all_veiculos()
    if not veiculos:
        raise HTTPException(status_code=404, detail="Nenhum veículo encontrado")
    return veiculos

@router.get("/veiculos/{placa_veiculo}", response_model=VeiculoDTO, tags=["Veiculo"])
def read_veiculo_by_id(placa_veiculo: str):
    veiculo = get_veiculo(placa_veiculo)
    if veiculo is None:
        raise HTTPException(status_code=404, detail="Veículo não encontrado")
    return veiculo

@router.get("/categorias", response_model=list[CategoriaVeiculoDTO], tags=["Veiculo"])
def read_all_categorias():
    categorias = get_all_categorias()
    if not categorias:
        raise HTTPException(status_code=404, detail="Nenhuma categoria encontrada")
    return categorias

@router.get("/categorias/{tipo_categoria}/veiculos", response_model=list[VeiculoDTO], tags=["Veiculo"])
def read_veiculos_by_categoria(tipo_categoria: str):
    veiculos = get_veiculos_por_categoria(tipo_categoria)
    if not veiculos:
        raise HTTPException(status_code=404, detail="Nenhum veículo encontrado para a categoria especificada")
    return veiculos

@router.get("/preco/{categoria_veiculo_tipo_categoria}", response_model=list[PrecoDTO], tags=["Veiculo"])
def read_preco_by_categoria(categoria_veiculo_tipo_categoria: str):
    preco = get_preco(categoria_veiculo_tipo_categoria)
    if not preco:
        raise HTTPException(status_code=404, detail="Preço não encontrado para a categoria especificada")
    return preco
