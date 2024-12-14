import hashlib
from app.database import get_connection
from app.DTOs import PessoaDTO, ReservaDTO
from app.models import Pessoa
from datetime import datetime

def get_pessoa(cpf: int) -> PessoaDTO:
    try:
        """ 
        O cursor é um objeto que permite a execução de comandos SQL e a recuperação de resultados das consultas em um banco de dados. 
        Pense no cursor como um controlador que navega pelos resultados da consulta e fornece métodos para interagir com esses resultados 
        """
        conn = get_connection()
        cursor = conn.cursor(dictionary=True) # Criação do cursor
        query = "SELECT * FROM Pessoa WHERE cpf = %s"
        cursor.execute(query, (cpf,))  # Execução da consulta SQL
        pessoa = cursor.fetchone() # Recuperação de uma única linha do resultado
        cursor.close() # Fechamento do cursor
        conn.close()  # Fechamento da conexão

        return PessoaDTO(**pessoa)
    except Exception as e:
        # Handle the exception here
        print(f"An error occurred: {str(e)}")

def cadastrar_pessoa(pessoa: Pessoa) -> PessoaDTO:
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = "INSERT INTO Pessoa (cpf, nome, telefone, email, password) VALUES (%s, %s, %s, %s, %s)"
        password_hash = hashlib.md5(pessoa.password.encode()).hexdigest()
        cursor.execute(query, (pessoa.cpf, pessoa.nome, pessoa.telefone, pessoa.email, password_hash))
        conn.commit()
        cursor.close()
        conn.close()

        return {"cpf": pessoa.cpf, "nome": pessoa.nome, "telefone": pessoa.telefone, "email": pessoa.email}
    except Exception as e:
        # Handle the exception here
        print(f"An error occurred: {str(e)}")

def login_service(email: str, password: str) -> PessoaDTO:
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM Pessoa WHERE email = %s AND password = %s"
        password_hash = hashlib.md5(password.encode()).hexdigest()
        cursor.execute(query, (email, password_hash))
        pessoa = cursor.fetchone()
        cursor.close()
        conn.close()

        return PessoaDTO(**pessoa)
    except Exception as e:
        # Handle the exception here
        print(f"An error occurred: {str(e)}")

def get_veiculo(id_veiculo: int): 
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM Veiculo WHERE codigo = %s"
    cursor.execute(query, (id_veiculo,))
    veiculo = cursor.fetchone()
    cursor.close()
    conn.close()

    return veiculo

""" SERIVECES RESERVA """
def get_reserva(id_reserva: int) -> ReservaDTO:
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM Reserva WHERE id_reserva = %s"
    cursor.execute(query, (id_reserva,))
    reserva = cursor.fetchone()

    data_hora_retirada = reserva['data_hora_retirada']
    data_hora_devolucao = reserva['data_hora_devolucao']

    # Calculating the difference in days
    format = "%Y-%m-%d %H:%M:%S"
    diff = datetime.strptime(data_hora_devolucao, format) - datetime.strptime(data_hora_retirada, format)
    diff_in_days = diff.days

    cursor.close()
    conn.close()

    if reserva:
        return ReservaDTO(**reserva, diff_in_days=diff_in_days)
    return None

def create_reserva(reserva_data: dict) -> int:
    conn = get_connection()
    cursor = conn.cursor()
    query = """
    INSERT INTO Reserva (valor_multa, valor_seguro, valor_categoria, valor_desconto, data_hora_retirada, data_hora_devolucao, status, tem_motorista, veiculo_codigo, motorista_funcionario_pessoa_cpf, locatario_pessoa_cpf)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        reserva_data['valor_multa'], reserva_data['valor_seguro'], reserva_data['valor_categoria'], 
        reserva_data['valor_desconto'], reserva_data['data_hora_retirada'], reserva_data['data_hora_devolucao'],
        reserva_data['status'], reserva_data['tem_motorista'], reserva_data['veiculo_codigo'], 
        reserva_data['motorista_funcionario_pessoa_cpf'], reserva_data['locatario_pessoa_cpf']
    ))
    conn.commit()
    reserva_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return reserva_id