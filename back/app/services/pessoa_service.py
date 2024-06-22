import hashlib
from app.database import get_connection
from app.DTOs import PessoaDTO
from app.models import Pessoa

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
        query = "INSERT INTO Pessoa (cpf, nome, telefone, email, password) VALUES (%s, %s, %s, %s, MD5(%s))"
        cursor.execute(query, (pessoa.cpf, pessoa.nome, pessoa.telefone, pessoa.email, pessoa.password))
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
        query = "SELECT * FROM Pessoa WHERE email = %s AND password = MD5(%s)"
        cursor.execute(query, (email, password))
        pessoa = cursor.fetchone()
        cursor.close()
        conn.close()

        return PessoaDTO(**pessoa)
    except Exception as e:
        # Handle the exception here
        print(f"An error occurred: {str(e)}")
