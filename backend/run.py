from app import create_app
from flask_cors import CORS

# Criar a aplicação usando a função create_app
app = create_app()

# Habilitar CORS para a aplicação
CORS(app)

# Iniciar o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)
