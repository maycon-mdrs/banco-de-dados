from mysql.connector import pooling

dbconfig = {
    "user": "root",
    "password": "root",
    "host": "localhost",
    "database": "projetodb"
}

connection_pool = pooling.MySQLConnectionPool(pool_name="mypool",
                                              pool_size=10,
                                              **dbconfig)

def get_connection():
    return connection_pool.get_connection()
