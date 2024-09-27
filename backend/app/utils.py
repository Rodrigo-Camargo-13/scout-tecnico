from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password):
    """Retorna uma senha criptografada"""
    return generate_password_hash(password)

def verify_password(stored_password, provided_password):
    """Verifica se a senha fornecida corresponde à senha armazenada"""
    return check_password_hash(stored_password, provided_password)