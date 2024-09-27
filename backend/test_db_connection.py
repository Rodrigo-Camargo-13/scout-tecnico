from sqlalchemy import text
from app import create_app, db

app = create_app()

with app.app_context():
    try:
        # Executa uma simples consulta de teste ao banco de dados
        result = db.session.execute(text('SELECT 1'))
        print("Conexão ao banco de dados estabelecida com sucesso!")
    except Exception as e:
        print(f"Erro ao conectar-se ao banco de dados: {e}")
