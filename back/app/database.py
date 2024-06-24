from mysql.connector import pooling
import os
from dotenv import load_dotenv

load_dotenv()  # Loads environment variables from .env file

dbconfig = {
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_DATABASE"),
}

connection_pool = pooling.MySQLConnectionPool(pool_name="mypool",
                                              pool_size=10,
                                              **dbconfig)

def get_connection():
    return connection_pool.get_connection()
