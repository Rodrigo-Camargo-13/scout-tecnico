from flask import Blueprint, request, jsonify, session
from .models import User, db
from flask_bcrypt import Bcrypt

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# Rota de registro
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email já existe"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(email=data['email'], password_hash=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso"}), 201

# Rota de login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id
        return jsonify({"message": "Login bem-sucedido"}), 200
    return jsonify({"error": "Credenciais inválidas"}), 400

# Rota para logout
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logout realizado com sucesso"}), 200
