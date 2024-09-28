import os
import requests
from flask import request, jsonify, Blueprint, session
from marshmallow import Schema, fields, validate, ValidationError
from flask_cors import CORS  # Importando o CORS
from .models import User, Player, Team, Coach
from . import db, bcrypt

# Definindo o blueprint para as rotas
routes = Blueprint('routes', __name__)
CORS(routes, supports_credentials=True, resources={r"/*": {"origins": "*"}})  # Permitir todos os domínios

# ------------------------------------------
# SWAGGER CONFIGURAÇÃO
# ------------------------------------------

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'  # Local onde o arquivo swagger.json estava armazenado antes de ser excluído

# ------------------------------------------
# ROTAS DA APLICAÇÃO
# ------------------------------------------

@routes.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Bem-vindo à API de Scout Técnico!"}), 200

# ------------------------------------------
# ROTAS PARA USUÁRIOS
# ------------------------------------------

@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validações
    if not email or not password:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    # Verifica se o usuário já existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "Usuário já existe"}), 400

    # Criação de um novo usuário
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')  # Cria o hash da senha
    new_user = User(email=email, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso"}), 201

@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validações
    if not email or not password:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    # Verifica credenciais
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        session['user_id'] = user.id  # Armazenar o ID do usuário na sessão
        return jsonify({"message": "Login bem-sucedido", "email": user.email}), 200
    else:
        return jsonify({"message": "Credenciais inválidas"}), 401

@routes.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logout realizado com sucesso"}), 200

# ------------------------------------------
# ROTAS PARA JOGADORES
# ------------------------------------------

# Validação para jogador usando Marshmallow
class PlayerSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    position = fields.Str(required=True, validate=validate.Length(min=1))
    team = fields.Str()
    goals = fields.Int()
    assists = fields.Int()

player_schema = PlayerSchema()

@routes.route('/register-player', methods=['POST'])
def add_player():
    data = request.get_json()

    # Valida os dados de entrada
    try:
        player_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_player = Player(
        name=data['name'],
        position=data['position'],
        team=data.get('team', None),
        goals=data.get('goals', 0),
        assists=data.get('assists', 0)
    )
    db.session.add(new_player)
    db.session.commit()

    return jsonify({"message": "Jogador adicionado com sucesso"}), 201

@routes.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    return jsonify([{
        "id": player.id,
        "name": player.name,
        "position": player.position,
        "team": player.team,
        "goals": player.goals,
        "assists": player.assists
    } for player in players]), 200

@routes.route('/players/<int:id>', methods=['PUT'])
def update_player(id):
    player = Player.query.get_or_404(id)
    data = request.get_json()

    # Valida os dados de entrada
    try:
        player_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    # Atualizações
    player.name = data.get('name', player.name)
    player.position = data.get('position', player.position)
    player.team = data.get('team', player.team)
    player.goals = data.get('goals', player.goals)
    player.assists = data.get('assists', player.assists)

    db.session.commit()
    return jsonify({"message": "Jogador atualizado com sucesso"}), 200

@routes.route('/players/<int:id>', methods=['DELETE'])
def delete_player(id):
    player = Player.query.get_or_404(id)
    db.session.delete(player)
    db.session.commit()
    return jsonify({"message": "Jogador removido com sucesso"}), 200

# ------------------------------------------
# ROTAS PARA TIMES
# ------------------------------------------

@routes.route('/register-team', methods=['POST'])
def add_team():
    data = request.get_json()

    # Verifica se o time já existe
    team = Team.query.filter_by(name=data.get('name')).first()
    if team:
        return jsonify({"message": "Time já está cadastrado"}), 400

    new_team = Team(
        name=data['name'],
        coach=data.get('coach')
    )
    db.session.add(new_team)
    db.session.commit()

    return jsonify({"message": "Time adicionado com sucesso"}), 201

@routes.route('/teams', methods=['GET'])
def get_teams():
    teams = Team.query.all()
    return jsonify([{
        "id": team.id,
        "name": team.name,
        "coach": team.coach
    } for team in teams]), 200

@routes.route('/teams/<int:id>', methods=['PUT'])
def update_team(id):
    team = Team.query.get_or_404(id)
    data = request.get_json()

    # Atualizações
    team.name = data.get('name', team.name)
    team.coach = data.get('coach', team.coach)

    db.session.commit()
    return jsonify({"message": "Time atualizado com sucesso"}), 200

@routes.route('/teams/<int:id>', methods=['DELETE'])
def delete_team(id):
    team = Team.query.get_or_404(id)
    db.session.delete(team)
    db.session.commit()
    return jsonify({"message": "Time removido com sucesso"}), 200

# ------------------------------------------
# ROTAS PARA TREINADORES
# ------------------------------------------

@routes.route('/register-coach', methods=['POST'])
def add_coach():
    data = request.get_json()

    # Verifica se o treinador já existe
    coach = Coach.query.filter_by(name=data.get('name')).first()
    if coach:
        return jsonify({"message": "Treinador já está cadastrado"}), 400

    new_coach = Coach(
        name=data.get('name'),
        team=data.get('team')
    )
    db.session.add(new_coach)
    db.session.commit()

    return jsonify({"message": "Treinador adicionado com sucesso"}), 201

@routes.route('/coaches', methods=['GET'])
def get_coaches():
    coaches = Coach.query.all()
    return jsonify([{
        "id": coach.id,
        "name": coach.name,
        "team": coach.team
    } for coach in coaches]), 200

@routes.route('/coaches/<int:id>', methods=['PUT'])
def update_coach(id):
    coach = Coach.query.get_or_404(id)
    data = request.get_json()

    # Atualizações
    coach.name = data.get('name', coach.name)
    coach.team = data.get('team', coach.team)

    db.session.commit()
    return jsonify({"message": "Treinador atualizado com sucesso"}), 200

@routes.route('/coaches/<int:id>', methods=['DELETE'])
def delete_coach(id):
    coach = Coach.query.get_or_404(id)
    db.session.delete(coach)
    db.session.commit()
    return jsonify({"message": "Treinador removido com sucesso"}), 200

# ------------------------------------------
# ROTA PARA CONSUMIR A API EXTERNA (Football Data)
# ------------------------------------------

@routes.route('/football/matches', methods=['GET'])
def get_matches():
    api_key = os.getenv('FOOTBALL_API_KEY')
    base_url = "https://api.football-data.org/v4/matches"

    headers = {
        'X-Auth-Token': api_key
    }

    try:
        # Fazendo a requisição para a API externa
        response = requests.get(base_url, headers=headers)

        # Verificando o status da resposta
        if response.status_code == 200:
            data = response.json()
            # Retornando a resposta JSON para o frontend
            return jsonify(data), 200
        else:
            return jsonify({"message": "Erro ao buscar partidas"}), response.status_code

    except Exception as e:
        return jsonify({"message": f"Erro de comunicação com a API externa: {str(e)}"}), 500
