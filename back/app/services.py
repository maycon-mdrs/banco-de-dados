import hashlib
from app.database import get_connection
from app.DTOs import PessoaDTO
from app.models import Pessoa

def get_pessoa(cpf: int) -> PessoaDTO:
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM Pessoa WHERE cpf = %s"
        cursor.execute(query, (cpf,))
        pessoa = cursor.fetchone()
        cursor.close()
        conn.close()

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
