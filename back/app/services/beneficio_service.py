from app.models import Beneficio
from app.DTOs import BeneficioDTO
from app.database import get_connection

class BeneficioService:
    
    def create_beneficio(self, beneficio_dto: BeneficioDTO) -> BeneficioDTO:
        try:
            #beneficio = Beneficio(**beneficio_dto.dict())
            
            conn = get_connection()
            cursor = conn.cursor()

            query = """
                INSERT INTO Beneficio (beneficio, plano_id_plano)
                VALUES (%s, %s)
            """
            cursor.execute(query, (beneficio_dto.beneficio, beneficio_dto.plano_id_plano))
            conn.commit()

            cursor.close()
            conn.close()

            return beneficio_dto

        except Exception as e:
            print(f"Error creating Beneficio: {str(e)}")
            return None
