import requests
import os
import django
from django.conf import settings

# Setup Django environment to create user
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from rest_framework.test import APIClient
from api.models import Hogamdo

def test_api():
    print("Setting up test user...")
    username = 'testuser_api'
    password = 'testpassword123'
    email = 'test_api@example.com'
    
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
    else:
        user = User.objects.create_user(username=username, password=password, email=email)

    client = APIClient()
    
    # 1. Test Unauthenticated
    print("\nTesting Unauthenticated Access...")
    response = client.get('/hogamdo/')
    print(f"GET /hogamdo/ status: {response.status_code}")
    if response.status_code == 403:
        print("PASS: Unauthenticated access denied.")
    else:
        print("FAIL: Unauthenticated access allowed.")

    # 2. Login & Test Hogamdo
    print("\nTesting Hogamdo Endpoint...")
    client.force_authenticate(user=user)
    
    # POST
    data = {'character': 'lee', 'score_change': 10}
    response = client.post('/hogamdo/', data, format='json')
    print(f"POST /hogamdo/ status: {response.status_code}")
    print(f"Response: {response.data}")
    
    if response.status_code == 200 and response.data['new_score'] == 10:
        print("PASS: Score updated.")
    else:
        print("FAIL: Score update failed.")

    # GET
    response = client.get('/hogamdo/')
    print(f"GET /hogamdo/ status: {response.status_code}")
    print(f"Response: {response.data}")
    if response.status_code == 200 and response.data.get('lee') == 10:
        print("PASS: Score retrieved.")
    else:
        print("FAIL: Score retrieval failed.")

    # 3. Test Chat
    print("\nTesting Chat Endpoint...")
    # Note: This will fail if OpenAI key is invalid, but we check for 500 or 200.
    # If key is dummy, it might return 500 or 401 from OpenAI.
    
    data = {'message': 'Hello, Lee!'}
    response = client.post('/chat/lee/', data, format='json')
    print(f"POST /chat/lee/ status: {response.status_code}")
    print(f"Response: {response.data}")
    
    if response.status_code == 200:
        print("PASS: Chat response received.")
    elif response.status_code == 500:
        print("WARN: Chat failed (likely invalid OpenAI key), but endpoint is reachable.")
    else:
        print("FAIL: Chat endpoint failed.")

if __name__ == "__main__":
    test_api()
