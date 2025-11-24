from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Hogamdo

class CharacterTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.character = 'lee'
        self.hogamdo = Hogamdo.objects.create(user=self.user, character=self.character, score=10, game_step=2)

    def test_get_character_info(self):
        url = reverse('character-info', kwargs={'character': self.character})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.character)
        self.assertEqual(response.data['hogamdo'], 10)
        self.assertEqual(response.data['game_step'], 2)

    def test_get_character_info_new(self):
        url = reverse('character-info', kwargs={'character': 'seok'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'seok')
        self.assertEqual(response.data['hogamdo'], 0)
        self.assertEqual(response.data['game_step'], 0)

    def test_chat_endpoint_exists(self):
        # Just checking if the URL resolves and returns 400 for missing message (logic check)
        url = reverse('character-chat', kwargs={'character': self.character})
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
