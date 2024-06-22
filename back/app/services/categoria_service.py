from app.database import get_connection
from app.DTOs import CategoriaVeiculoCreateDTO, CategoriaVeiculoDTO, PrecoDTO, VeiculoDTO
from app.services.veiculo_service import VeiculoService

veiculo_service = VeiculoService()

class CategoriaService: 
    # Método para recuperar todas as categorias de veículos
    def get_all_categorias(self):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            
            # Consulta para buscar todas as categorias de veículos e seus preços associados
            query = """
                SELECT 
                    cv.tipo_categoria, 
                    cv.tipo_veiculo, 
                    cv.quant_passageiros, 
                    cv.quant_bagagens,
                    p.data,
                    p.multa_hora,
                    p.preco_dia
                FROM 
                    CategoriaVeiculo cv
                LEFT JOIN 
                    Preco p
                ON 
                    cv.tipo_categoria = p.categoria_veiculo_tipo_categoria
            """
            
            cursor.execute(query)
            categorias = cursor.fetchall()
            cursor.close()
            conn.close()

            # Transformar os resultados em uma lista de objetos CategoriaVeiculoDTO
            categorias_dto = []
            for categoria in categorias:
                categoria_dto = CategoriaVeiculoCreateDTO(
                    tipo_categoria=categoria['tipo_categoria'],
                    tipo_veiculo=categoria['tipo_veiculo'],
                    quant_passageiros=categoria['quant_passageiros'],
                    quant_bagagens=categoria['quant_bagagens'],
                    data=categoria['data'],
                    multa_hora=categoria['multa_hora'],
                    preco_dia=categoria['preco_dia']
                )
                categorias_dto.append(categoria_dto)

            return categorias_dto

        except Exception as e:
            return f"An error occurred while retrieving all categorias: {e}"
        
    def get_preco(self, categoria_veiculo_tipo_categoria: str):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = "SELECT * FROM Preco WHERE categoria_veiculo_tipo_categoria = %s"
            cursor.execute(query, (categoria_veiculo_tipo_categoria,))
            preco = cursor.fetchall()
            cursor.close()
            conn.close()
            return preco
        except Exception as e:
            return f"An error occurred while retrieving the preco: {e}"
        
    # Novo método para obter o preço de uma categoria específica
    def get_preco_categoria(self, tipo_categoria: int):
        try:
            categoria = veiculo_service.get_categoria_veiculo(tipo_categoria)
            if categoria:
                preco = veiculo_service.get_preco(categoria['tipo_categoria'])
                if preco:
                    return preco
            return None
        except Exception as e:
            return f"An error occurred while retrieving the preco categoria: {e}"

    def create_categoria_preco(self, categoria_preco_dto: CategoriaVeiculoCreateDTO) -> CategoriaVeiculoCreateDTO:
        try:
            conn = get_connection()
            cursor = conn.cursor()

            # Verificar se a categoria já existe
            query_check_categoria = """
                SELECT tipo_categoria FROM CategoriaVeiculo WHERE tipo_categoria = %s
            """
            cursor.execute(query_check_categoria, (categoria_preco_dto.tipo_categoria,))
            existing_categoria = cursor.fetchone()

            if existing_categoria:
                print(f"Categoria {categoria_preco_dto.tipo_categoria} already exists.")
                return None

            # Inserir a categoria de veículo
            query_categoria = """
                INSERT INTO CategoriaVeiculo (tipo_categoria, tipo_veiculo, quant_passageiros, quant_bagagens)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query_categoria, (
                categoria_preco_dto.tipo_categoria,
                categoria_preco_dto.tipo_veiculo,
                categoria_preco_dto.quant_passageiros,
                categoria_preco_dto.quant_bagagens
            ))

            # Inserir o preço associado à categoria de veículo
            preco_dto = PrecoDTO(
                data=categoria_preco_dto.data,
                multa_hora=categoria_preco_dto.multa_hora,
                preco_dia=categoria_preco_dto.preco_dia
            )

            query_preco = """
                INSERT INTO Preco (data, multa_hora, preco_dia, categoria_veiculo_tipo_categoria)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query_preco, (
                preco_dto.data,
                preco_dto.multa_hora,
                preco_dto.preco_dia,
                categoria_preco_dto.tipo_categoria  # Usando o tipo_categoria como chave estrangeira
            ))

            conn.commit()
            cursor.close()
            conn.close()

            return categoria_preco_dto

        except Exception as e:
            print(f"Error creating Categoria and Preco: {str(e)}")
            return None

    def update_categoria_preco(self, tipo_categoria: str, categoria_preco_dto: CategoriaVeiculoCreateDTO) -> CategoriaVeiculoCreateDTO:
        try:
            conn = get_connection()
            cursor = conn.cursor()

            # Atualizar a categoria de veículo
            query_categoria = """
                UPDATE CategoriaVeiculo 
                SET tipo_veiculo = %s, quant_passageiros = %s, quant_bagagens = %s 
                WHERE tipo_categoria = %s
            """
            cursor.execute(query_categoria, (
                categoria_preco_dto.tipo_veiculo,
                categoria_preco_dto.quant_passageiros,
                categoria_preco_dto.quant_bagagens,
                tipo_categoria
            ))

            # Atualizar o preço associado à categoria de veículo
            preco_dto = PrecoDTO(
                data=categoria_preco_dto.data,
                multa_hora=categoria_preco_dto.multa_hora,
                preco_dia=categoria_preco_dto.preco_dia
            )

            query_preco = """
                UPDATE Preco 
                SET data = %s, multa_hora = %s, preco_dia = %s 
                WHERE categoria_veiculo_tipo_categoria = %s
            """
            cursor.execute(query_preco, (
                preco_dto.data,
                preco_dto.multa_hora,
                preco_dto.preco_dia,
                tipo_categoria
            ))

            conn.commit()
            cursor.close()
            conn.close()

            return categoria_preco_dto

        except Exception as e:
            print(f"Error updating Categoria and Preco: {str(e)}")
            return None

    def delete_categoria_veiculo(self, tipo_categoria: str) -> bool:
        try:
            conn = get_connection()
            cursor = conn.cursor()

            query = """
                DELETE FROM CategoriaVeiculo WHERE tipo_categoria = %s
            """
            cursor.execute(query, (tipo_categoria,))
            conn.commit()

            cursor.close()
            conn.close()

            return True

        except Exception as e:
            print(f"Error deleting CategoriaVeiculo: {str(e)}")
            return False