import pytest
import requests
from typing import Dict
from app import app, db
from models import User

# Define test fixtures
@pytest.fixture(scope="module")
def test_client():
    # Use an in-memory SQLite database for testing
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['TESTING'] = True

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()

@pytest.fixture(scope="module")
def auth_headers(test_client):
    # Register a test user and get an auth token
    test_user = {'email': 'testuser@example.com', 'password': 'testpassword'}
    response = test_client.post('/api/users/register', json=test_user)
    assert response.status_code == 201

    auth_data = {'email': test_user['email'], 'password': test_user['password']}
    response = test_client.post('/api/users/login', json=auth_data)
    assert response.status_code == 200

    token = response.json['access_token']
    headers = {'Authorization': f'Bearer {token}'}
    return headers

# Define test functions
def test_authenticate_user_success(test_client, auth_headers):
    response = test_client.get('/api/users/me', headers=auth_headers)
    assert response.status_code == 200
    assert response.json['email'] == 'testuser@example.com'

def test_authenticate_user_failure(test_client):
    response = test_client.get('/api/users/me')
    assert response.status_code == 401

def test_create_service_success(test_client, auth_headers):
    service_data = {'name': 'Test Service', 'price': 10.0}
    response = test_client.post('/api/services', json=service_data, headers=auth_headers)
    assert response.status_code == 201
    assert response.json['name'] == 'Test Service'

def test_create_service_failure(test_client):
    service_data = {'name': 'Test Service', 'price': 10.0}
    response = test_client.post('/api/services', json=service_data)
    assert response.status_code == 401

def test_get_all_services_success(test_client):
    response = test_client.get('/api/services')
    assert response.status_code == 200
    assert len(response.json) == 1

# Define a test user
test_user = {'email': 'testuser@example.com', 'password': 'testpassword'}

def test_register_user_success(test_client):
    response = test_client.post('/api/users/register', json=test_user)
    assert response.status_code == 201
    assert response.json['email'] == 'testuser@example.com'

def test_register_user_failure(test_client):
    response = test_client.post('/api/users/register', json=test_user)
    assert response.status_code == 400

def test_login_success(test_client):
    auth_data = {'email': test_user['email'], 'password': test_user['password']}
    response = test_client.post('/api/users/login', json=auth_data)
    assert response.status_code == 200
    assert 'access_token' in response.json

def test_login_failure(test_client):
    auth_data = {'email': test_user['email'], 'password': 'wrongpassword'}
    response = test_client.post('/api/users/login', json=auth_data)
    assert response.status_code == 401

# Run the tests
if __name__ == '__main__':
    pytest.main()
