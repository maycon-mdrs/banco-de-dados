from datetime import datetime
from typing import List, Optional
from app.models import Reserva
from app.database import get_connection
from app.DTOs import ReservaCreateDTO, ReservaDTO

class ReservaService:
    
    def get_reserva_by_id(self, id_reserva: int) -> ReservaDTO:
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = """
                SELECT * FROM Reserva WHERE id_reserva = %s
            """
            cursor.execute(query, (id_reserva,))
            reserva_data = cursor.fetchone()
            cursor.close()
            conn.close()

            if not reserva_data:
                return None

            # Mapeie os dados do banco de dados para ReservaDTO
            reserva = ReservaDTO(
                id_reserva=reserva_data['id_reserva'],
                valor_multa=reserva_data['valor_multa'],
                valor_seguro=reserva_data['valor_seguro'],
                valor_categoria=reserva_data['valor_categoria'],
                valor_desconto=reserva_data['valor_desconto'],
                data_hora_retirada=reserva_data['data_hora_retirada'],
                data_hora_devolucao=reserva_data['data_hora_devolucao'],
                data_hora_devolucao_efetiva=reserva_data.get('data_hora_devolucao_efetiva'),  # Pode ser None se não existir
                status=reserva_data['status'],
                tem_motorista=reserva_data['tem_motorista'],
                veiculo_codigo=reserva_data['veiculo_codigo'],
                motorista_funcionario_pessoa_cpf=reserva_data['motorista_funcionario_pessoa_cpf'],
                locatario_pessoa_cpf=reserva_data['locatario_pessoa_cpf']
            )

            return reserva
        except Exception as e:
            print(f"Error retrieving reserva by id: {str(e)}")
            return None
        
    def get_all_reservas(self):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = "SELECT * FROM Reserva"
            cursor.execute(query)
            reservas = cursor.fetchall()
            cursor.close()
            conn.close()
            
            reservas_dto = []
            for reserva in reservas:
                reserva_dto = ReservaDTO(
                    id_reserva=reserva['id_reserva'],
                    valor_multa=reserva['valor_multa'],
                    valor_seguro=reserva['valor_seguro'],
                    valor_categoria=reserva['valor_categoria'],
                    valor_desconto=reserva['valor_desconto'],
                    data_hora_retirada=reserva['data_hora_retirada'],
                    data_hora_devolucao=reserva['data_hora_devolucao'],
                    data_hora_devolucao_efetiva=reserva.get('data_hora_devolucao_efetiva'),  # Pode ser None se não existir
                    status=reserva['status'],
                    tem_motorista=reserva['tem_motorista'],
                    veiculo_codigo=reserva['veiculo_codigo'],
                    motorista_funcionario_pessoa_cpf=reserva['motorista_funcionario_pessoa_cpf'],
                    locatario_pessoa_cpf=reserva['locatario_pessoa_cpf']
                )
                reservas_dto.append(reserva_dto)
            
            return reservas_dto 
        except Exception as e:
            print(f"An error occurred while retrieving all reservas: {e}")
            return None

    def get_reservas_by_cpf(self, cpf: str) -> List[ReservaDTO]:
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            query = """
                SELECT * FROM Reserva WHERE locatario_pessoa_cpf = %s
            """
            cursor.execute(query, (cpf,))
            reservas_data = cursor.fetchall()
            cursor.close()
            conn.close()

            reservas = []
            for reserva_data in reservas_data:
                reserva = ReservaDTO(
                    id_reserva=reserva_data['id_reserva'],
                    valor_multa=reserva_data['valor_multa'],
                    valor_seguro=reserva_data['valor_seguro'],
                    valor_categoria=reserva_data['valor_categoria'],
                    valor_desconto=reserva_data['valor_desconto'],
                    data_hora_retirada=reserva_data['data_hora_retirada'],
                    data_hora_devolucao=reserva_data['data_hora_devolucao'],
                    data_hora_devolucao_efetiva=reserva_data.get('data_hora_devolucao_efetiva'),  # Pode ser None se não existir
                    status=reserva_data['status'],
                    tem_motorista=reserva_data['tem_motorista'],
                    veiculo_codigo=reserva_data['veiculo_codigo'],
                    motorista_funcionario_pessoa_cpf=reserva_data['motorista_funcionario_pessoa_cpf'],
                    locatario_pessoa_cpf=reserva_data['locatario_pessoa_cpf']
                )
                reservas.append(reserva)

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

    def alterar_status_reserva(self, id_reserva: int, novo_status: str) -> Optional[ReservaDTO]:
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
            return self.get_reserva_by_id(id_reserva)
        except Exception as e:
            print(f"Error updating status of reserva: {str(e)}")
            return False

    def criar_reserva(self, reserva: ReservaCreateDTO) -> Optional[ReservaDTO]:
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            
            # Verificar disponibilidade do veículo e obter categoria e preço
            query = """
                SELECT V.disponibilidade, V.categoria_veiculo_tipo_categoria, P.preco_dia
                FROM Veiculo V
                LEFT JOIN Preco P ON V.categoria_veiculo_tipo_categoria = P.categoria_veiculo_tipo_categoria
                WHERE V.codigo = %s
            """
            cursor.execute(query, (reserva.veiculo_codigo,))
            veiculo_info = cursor.fetchone()
            
            if not veiculo_info or veiculo_info['disponibilidade'] == 0:
                print("Veículo não disponível")
                raise Exception("Veículo não disponível")
            
            # Calcular o valor total da reserva
            dias_reserva = (reserva.data_hora_devolucao - reserva.data_hora_retirada).days
            valor_total = dias_reserva * veiculo_info['preco_dia']
            
            # Inserir reserva
            insert_query = """
                INSERT INTO Reserva (valor_multa, valor_seguro, valor_categoria, valor_desconto,
                                     data_hora_retirada, data_hora_devolucao, data_hora_devolucao_efetiva, status, tem_motorista,
                                     veiculo_codigo, motorista_funcionario_pessoa_cpf, locatario_pessoa_cpf)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (0, 0, valor_total, 0, reserva.data_hora_retirada,
                                          reserva.data_hora_devolucao, None, reserva.status,
                                          reserva.tem_motorista, reserva.veiculo_codigo,
                                          reserva.motorista_funcionario_pessoa_cpf,
                                          reserva.locatario_pessoa_cpf))
            conn.commit()
            
            # Atualizar disponibilidade do veículo
            update_query = """
                UPDATE Veiculo SET disponibilidade = 0 WHERE codigo = %s
            """
            cursor.execute(update_query, (reserva.veiculo_codigo,))
            conn.commit()
            
            cursor.close()
            conn.close()
            
            # Retornar a reserva criada
            return self.get_reserva_by_id(cursor.lastrowid)
        
        except Exception as e:
            print(f"Error creating reserva: {str(e)}")
            return None
    
    def devolucao_veiculo(self, id_reserva: int, novo_status: str, data_hora_devolucao_efetiva: Optional[datetime]) -> Optional[ReservaDTO]:
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            
            # Atualizar status da reserva e data_hora_devolucao_efetiva se fornecida
            if data_hora_devolucao_efetiva:
                # Primeiro, verificar se a reserva já foi concluída anteriormente
                query = """
                    SELECT status, data_hora_devolucao_efetiva FROM Reserva WHERE id_reserva = %s
                """
                cursor.execute(query, (id_reserva,))
                reserva_anterior = cursor.fetchone()
                
                if reserva_anterior['status'].lower() == 'concluido':
                    print("Esta reserva já foi concluída anteriormente.")
                    return None
                
                # Calcular a multa por hora de atraso
                data_hora_devolucao = reserva_anterior['data_hora_devolucao_efetiva']
                multa_por_hora = 50.0  # Exemplo: multa de R$ 50,00 por hora de atraso
                
                if data_hora_devolucao:
                    horas_de_atraso = (data_hora_devolucao_efetiva - data_hora_devolucao).total_seconds() / 3600
                    valor_multa = max(0, horas_de_atraso) * multa_por_hora
                else:
                    valor_multa = 0
                
                # Atualizar a reserva com data_hora_devolucao_efetiva, status e multa
                update_query = """
                    UPDATE Reserva 
                    SET status = %s, 
                        data_hora_devolucao_efetiva = %s, 
                        valor_multa = %s
                    WHERE id_reserva = %s
                """
                cursor.execute(update_query, (novo_status, data_hora_devolucao_efetiva, valor_multa, id_reserva))
            else:
                # Atualizar apenas o status da reserva se data_hora_devolucao_efetiva não for fornecida
                update_query = """
                    UPDATE Reserva SET status = %s WHERE id_reserva = %s
                """
                cursor.execute(update_query, (novo_status, id_reserva))
            
            conn.commit()
            
            # Obter veículo associado à reserva para atualizar a disponibilidade
            query = """
                SELECT veiculo_codigo FROM Reserva WHERE id_reserva = %s
            """
            cursor.execute(query, (id_reserva,))
            veiculo_codigo = cursor.fetchone()['veiculo_codigo']
            
            if novo_status.lower() == 'concluido':
                # Atualizar disponibilidade do veículo
                update_veiculo_query = """
                    UPDATE Veiculo SET disponibilidade = 1 WHERE codigo = %s
                """
                cursor.execute(update_veiculo_query, (veiculo_codigo,))
                conn.commit()
            
            cursor.close()
            conn.close()
            
            # Retornar a reserva atualizada
            return self.get_reserva_by_id(id_reserva)
        
        except Exception as e:
            print(f"Error updating status of reserva: {str(e)}")
            return None