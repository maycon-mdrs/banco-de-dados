from app.database import get_connection

def get_veiculo(id_veiculo: str): 
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
def get_all_veiculos():
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

def get_categoria_veiculo(tipo_categoria: str):
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

# Método para recuperar todas as categorias de veículos
def get_all_categorias():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM CategoriaVeiculo"
        cursor.execute(query)
        categorias = cursor.fetchall()
        cursor.close()
        conn.close()
        return categorias
    except Exception as e:
        return f"An error occurred while retrieving all categorias: {e}"

# Método para recuperar veículos por categoria
def get_veiculos_por_categoria(tipo_categoria: str):
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
def get_veiculos_em_categorias():
    try:
        categorias = get_all_categorias()
        veiculos_por_categoria = {}
        for categoria in categorias:
            tipo_categoria = categoria['tipo_categoria']
            veiculos = get_veiculos_por_categoria(tipo_categoria)
            veiculos_por_categoria[tipo_categoria] = veiculos
        return veiculos_por_categoria
    except Exception as e:
        return f"An error occurred while retrieving veiculos em categorias: {e}"

def get_preco(categoria_veiculo_tipo_categoria: str):
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
def get_preco_categoria(tipo_categoria: int):
    try:
        categoria = get_categoria_veiculo(tipo_categoria)
        if categoria:
            preco = get_preco(categoria['tipo_categoria'])
            if preco:
                return preco
        return None
    except Exception as e:
        return f"An error occurred while retrieving the preco categoria: {e}"
