from datetime import datetime
from typing import List, Optional
from app.models import Reserva
from app.database import get_connection
from app.DTOs import ReservaCreateDTO

class ReservaService:
    
    def get_reserva_by_id(self, id_reserva: int) -> Optional[Reserva]:
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = """
                SELECT * FROM Reserva WHERE id_reserva = %s
            """
            cursor.execute(query, (id_reserva,))
            reserva = cursor.fetchone()
            cursor.close()
            conn.close()
            return reserva if reserva else None
        except Exception as e:
            print(f"Error retrieving reserva by id: {str(e)}")
            return None

    def get_reservas_by_cpf(self, cpf: str) -> List[Reserva]:
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = """
                SELECT * FROM Reserva WHERE locatario_pessoa_cpf = %s
            """
            cursor.execute(query, (cpf,))
            reservas = cursor.fetchall()
            cursor.close()
            conn.close()
            return reservas
        except Exception as e:
            print(f"Error retrieving reservas by cpf: {str(e)}")
            return []

    def calcular_multa_hora(self, id_reserva: int) -> float:
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = """
                SELECT data_hora_retirada, data_hora_devolucao, data_hora_devolucao_efetiva, preco_dia, multa_hora
                FROM Reserva
                JOIN Preco ON Reserva.categoria_veiculo_tipo_categoria = Preco.categoria_veiculo_tipo_categoria
                WHERE id_reserva = %s
            """
            cursor.execute(query, (id_reserva,))
            result = cursor.fetchone()
            cursor.close()
            conn.close()

            if not result:
                return 0.0

            data_hora_retirada = result['data_hora_retirada']
            data_hora_devolucao = result['data_hora_devolucao']
            data_hora_devolucao_efetiva = result['data_hora_devolucao_efetiva']
            preco_dia = result['preco_dia']
            multa_hora = result['multa_hora']

            # Calcular a multa apenas se a data efetiva de devolução estiver preenchida
            if data_hora_devolucao_efetiva:
                if data_hora_devolucao_efetiva > data_hora_devolucao:
                    horas_atraso = (data_hora_devolucao_efetiva - data_hora_devolucao).total_seconds() / 3600
                    return horas_atraso * multa_hora
                else:
                    return 0.0
            else:
                # Se a devolução não foi efetuada, verificar se a data atual ultrapassa a data final
                data_atual = datetime.now()
                if data_atual > data_hora_devolucao:
                    horas_atraso = (data_atual - data_hora_devolucao).total_seconds() / 3600
                    return horas_atraso * multa_hora
                else:
                    return 0.0

        except Exception as e:
            print(f"Error calculating multa hora: {str(e)}")
            return 0.0

    def alterar_status_reserva(self, id_reserva: int, novo_status: str) -> bool:
        try:
            conn = get_connection()
            cursor = conn.cursor()
            query = """
                UPDATE Reserva SET status = %s WHERE id_reserva = %s
            """
            cursor.execute(query, (novo_status, id_reserva))
            conn.commit()
            cursor.close()
            conn.close()
            return True
        except Exception as e:
            print(f"Error updating status of reserva: {str(e)}")
            return False

    def criar_reserva(self, reserva: ReservaCreateDTO):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            
            # Verificar disponibilidade do veículo
            query = """
                SELECT disponibilidade, categoria_veiculo_tipo_categoria FROM Veiculo WHERE codigo = %s
            """
            cursor.execute(query, (reserva.veiculo_codigo,))
            veiculo = cursor.fetchone()
            if not veiculo or veiculo['disponibilidade'] == 0:
                print("Veículo não disponível")
                raise Exception("Veículo não disponível")
            
            # Obter categoria do veículo
            categoria_veiculo_tipo_categoria = veiculo['categoria_veiculo_tipo_categoria']
            
            # Obter preço da categoria do veículo
            query = """
                SELECT * FROM Preco WHERE categoria_veiculo_tipo_categoria = %s
            """
            cursor.execute(query, (categoria_veiculo_tipo_categoria,))
            preco = cursor.fetchone()
            if not preco:
                print("Preço não encontrado para a categoria do veículo")
                raise Exception("Preço não encontrado para a categoria do veículo")
            
            # Calcular o valor total da reserva
            dias_reserva = (reserva.data_hora_devolucao - reserva.data_hora_retirada).days
            valor_total = dias_reserva * preco['preco_dia']
            
            # Inserir reserva
            query = """
                INSERT INTO Reserva (valor_multa, valor_seguro, valor_categoria, valor_desconto, data_hora_retirada, data_hora_devolucao, status, tem_motorista, veiculo_codigo, locatario_pessoa_cpf)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (0, 0, preco['preco_dia'], 0, reserva.data_hora_retirada, reserva.data_hora_devolucao, reserva.status, reserva.tem_motorista, reserva.veiculo_codigo, reserva.locatario_pessoa_cpf))
            conn.commit()
            
            # Atualizar disponibilidade do veículo
            query = """
                UPDATE Veiculo SET disponibilidade = 0 WHERE codigo = %s
            """
            cursor.execute(query, (reserva.veiculo_codigo,))
            conn.commit()
            
            cursor.close()
            conn.close()
            
            # Ajustar os valores da reserva antes de retornar
            reserva.valor_multa = 0
            reserva.valor_seguro = 0
            reserva.valor_categoria = valor_total
            
            return reserva
        except Exception as e:
            print(f"Error creating reserva: {str(e)}")
            return None