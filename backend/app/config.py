import os
from dotenv import load_dotenv

# Carregar as variáveis do arquivo .env
load_dotenv()

class Config:
    # Pegando o SECRET_KEY e outras configurações do banco de dados do .env
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_secret_key')
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '186396')
    MYSQL_HOST = os.getenv('MYSQL_HOST', 'mysql')  # Apontando para o serviço 'mysql' no Docker Compose
    MYSQL_PORT = os.getenv('MYSQL_PORT', '3306')  # Usando a porta interna do MySQL no contêiner
    MYSQL_DB = os.getenv('MYSQL_DB', 'login_system')

    # Construindo a URI do banco de dados
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Pegando o token da API externa (Football Data)
    FOOTBALL_API_KEY = os.getenv('FOOTBALL_API_KEY')
