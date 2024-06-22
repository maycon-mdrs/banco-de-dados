from app.models import Preco
from app.DTOs import PrecoDTO
from app.database import get_connection

class PrecoService:
    
    def create_preco(self, preco_dto: PrecoDTO) -> PrecoDTO:
        try:
            preco = Preco(**preco_dto.dict())
            
            conn = get_connection()
            cursor = conn.cursor()

            query = """
                INSERT INTO Preco (data, multa_hora, preco_dia, categoria_veiculo_tipo_categoria)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (preco.data, preco.multa_hora, preco.preco_dia, preco.categoria_veiculo_tipo_categoria))
            conn.commit()

            cursor.close()
            conn.close()

            return preco_dto

        except Exception as e:
            print(f"Error creating Preco: {str(e)}")
            return None
