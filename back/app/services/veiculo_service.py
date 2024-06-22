from app.database import get_connection
from app.DTOs import CategoriaVeiculoCreateDTO, CategoriaVeiculoDTO, PrecoDTO, VeiculoDTO

class VeiculoService:

    def get_veiculo(self, id_veiculo: str): 
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = "SELECT * FROM Veiculo WHERE codigo = %s"
            cursor.execute(query, (id_veiculo,))
            veiculo = cursor.fetchone()
            cursor.close()
            conn.close()
            return veiculo
        except Exception as e:
            return f"An error occurred while retrieving the veiculo: {e}"

    # Método para recuperar todas os veículos
    def get_all_veiculos(self):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = "SELECT * FROM Veiculo"
            cursor.execute(query)
            veiculos = cursor.fetchall()
            cursor.close()
            conn.close()
            return veiculos
        except Exception as e:
            return f"An error occurred while retrieving all veiculos: {e}"

    def get_categoria_veiculo(self, tipo_categoria: str):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = "SELECT * FROM CategoriaVeiculo WHERE tipo_categoria = %s"
            cursor.execute(query, (tipo_categoria,))
            categoria_veiculo = cursor.fetchone()
            cursor.close()
            conn.close()
            return categoria_veiculo
        except Exception as e:
            return f"An error occurred while retrieving the categoria veiculo: {e}"

    # Método para recuperar veículos por categoria
    def get_veiculos_por_categoria(self, tipo_categoria: str):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = "SELECT * FROM Veiculo WHERE categoria_veiculo_tipo_categoria = %s"
            cursor.execute(query, (tipo_categoria,))
            veiculos = cursor.fetchall()
            cursor.close()
            conn.close()
            return veiculos
        except Exception as e:
            return f"An error occurred while retrieving veiculos by categoria: {e}"

    # Método para obter todos os veículos em todas as categorias
    def get_veiculos_em_categorias(self):
        try:
            categorias = self.get_all_categorias()
            veiculos_por_categoria = {}
            for categoria in categorias:
                tipo_categoria = categoria['tipo_categoria']
                veiculos = self.get_veiculos_por_categoria(tipo_categoria)
                veiculos_por_categoria[tipo_categoria] = veiculos
            return veiculos_por_categoria
        except Exception as e:
            return f"An error occurred while retrieving veiculos em categorias: {e}"
        
    def create_veiculo(self, veiculo: VeiculoDTO) -> VeiculoDTO:
        try:
            conn = get_connection()
            cursor = conn.cursor()

            query = """
                INSERT INTO Veiculo (codigo, pais, estado, cidade, disponibilidade, categoria_veiculo_tipo_categoria)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (
                veiculo.codigo, veiculo.pais, veiculo.estado,
                veiculo.cidade, veiculo.disponibilidade, veiculo.categoria_veiculo_tipo_categoria
            ))
            conn.commit()

            cursor.close()
            conn.close()

            return veiculo

        except Exception as e:
            print(f"Error creating Veiculo: {str(e)}")
            return None

    def update_veiculo(self, codigo: str, veiculo: VeiculoDTO) -> VeiculoDTO:
        try:
            conn = get_connection()
            cursor = conn.cursor()

            query = """
                UPDATE Veiculo 
                SET pais = %s, estado = %s, cidade = %s, disponibilidade = %s, categoria_veiculo_tipo_categoria = %s 
                WHERE codigo = %s
            """
            cursor.execute(query, (veiculo.pais, veiculo.estado, veiculo.cidade,
                                    veiculo.disponibilidade, veiculo.categoria_veiculo_tipo_categoria, codigo))
            conn.commit()

            cursor.close()
            conn.close()

            return veiculo

        except Exception as e:
            print(f"Error updating Veiculo: {str(e)}")
            return None

    def delete_veiculo(self, codigo: str) -> bool:
        try:
            conn = get_connection()
            cursor = conn.cursor()

            query = """
                DELETE FROM Veiculo WHERE codigo = %s
            """
            cursor.execute(query, (codigo,))
            conn.commit()

            cursor.close()
            conn.close()

            return True

        except Exception as e:
            print(f"Error deleting Veiculo: {str(e)}")
            return False