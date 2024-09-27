# backend/app/auth.py
from flask import Blueprint, request, jsonify
from .models import User, db

auth_bp = Blueprint('auth', __name__)

# Rota de registro
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Rota de login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 400
