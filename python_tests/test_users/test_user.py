import pytest
import requests

# set up the base URL for our API
BASE_URL = "http://localhost:3000/api"

# test the GET /users route
def test_get_users():
    response = requests.get(f"{BASE_URL}/users")
    assert response.status_code == 200
    assert len(response.json()) > 0

# test the GET /users/:id route
def test_get_user():
    user_id = 1 # set the user ID to test
    response = requests.get(f"{BASE_URL}/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["id"] == user_id

# test the POST /users route
def test_create_user():
    data = {"email": "testuser@example.com", "password": "password123"}
    response = requests.post(f"{BASE_URL}/users", json=data)
    assert response.status_code == 201
    assert response.json()["email"] == data["email"]

# test the PUT /users/:id route
def test_update_user():
    user_id = 1 # set the user ID to update
    data = {"email": "newemail@example.com", "password": "newpassword123"}
    response = requests.put(f"{BASE_URL}/users/{user_id}", json=data)
    assert response.status_code == 200
    assert response.json()["email"] == data["email"]

# test the DELETE /users/:id route
def test_delete_user():
    user_id = 1 # set the user ID to delete
    response = requests.delete(f"{BASE_URL}/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted successfully"
