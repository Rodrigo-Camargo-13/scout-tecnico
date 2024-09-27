from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os

# Inicializando extensões
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)

    # Configuração da aplicação (usando variáveis de ambiente ou arquivo config.py)
    app.config.from_object('app.config.Config')

    # Inicializando extensões com o app Flask
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    
    # CORS habilitado
    CORS(app)

    # Registrar rotas
    from .routes import routes  # Importando rotas
    app.register_blueprint(routes)

    # Configuração do Swagger
    from flask_swagger_ui import get_swaggerui_blueprint
    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'  # Certifique-se de que o arquivo existe neste local
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL, 
        API_URL, 
        config={'app_name': "API de Scout Técnico"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    # Configurações opcionais para produção (caso necessário)
    if os.getenv('FLASK_ENV') == 'production':
        # Exemplo de ajustes para ambiente de produção
        app.config.update(
            DEBUG=False,
            SESSION_COOKIE_SECURE=True,
            REMEMBER_COOKIE_SECURE=True,
            PREFERRED_URL_SCHEME='https'
        )
    
    return app
