from sqlalchemy import text
from app import create_app, db
import pytest

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    client = app.test_client()

    with app.app_context():
        db.create_all()
    yield client

    with app.app_context():
        db.drop_all()

def test_db_connection(client):
    with client:
        result = db.session.execute(text('SELECT 1'))
        assert result.fetchone() is not None
        print("Conexão ao banco de dados estabelecida com sucesso!")
