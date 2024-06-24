from app.models import Plano
from app.DTOs import PlanoDTO
from app.database import get_connection

class PlanoService:
    
    def create_plano(self, plano_dto: PlanoDTO) -> PlanoDTO:
        try:
            #plano = Plano(**plano_dto.dict())
            
            conn = get_connection()
            cursor = conn.cursor()

            query = """
                INSERT INTO Plano (valor, locatario_pessoa_cpf)
                VALUES (%s, %s)
            """
            cursor.execute(query, (plano_dto.valor, plano_dto.locatario_pessoa_cpf))
            conn.commit()

            cursor.close()
            conn.close()

            return plano_dto

        except Exception as e:
            print(f"Error creating Plano: {str(e)}")
            return None

