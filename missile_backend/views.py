from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.conf import settings
from .models import Hogamdo
from .serializers import UserSerializer, LoginSerializer, CharacterInfoSerializer, ChatSerializer, CharacterUpdateSerializer
from drf_yasg.utils import swagger_auto_schema
import openai

class RegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'user': UserSerializer(user).data
                })
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=UserSerializer)
    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CharacterInfoView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CharacterInfoSerializer

    def get_object(self):
        character = self.kwargs.get('character')
        if character not in dict(Hogamdo.CHARACTER_CHOICES):
            return None
        hogamdo, created = Hogamdo.objects.get_or_create(user=self.request.user, character=character)
        return hogamdo

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({'error': 'Invalid character'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CharacterUpdateSerializer)
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({'error': 'Invalid character'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CharacterUpdateSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=ChatSerializer)
    def post(self, request, character):
        message = request.data.get('message')
        if not message:
            return Response({'error': 'Missing message'}, status=status.HTTP_400_BAD_REQUEST)

        if character not in dict(Hogamdo.CHARACTER_CHOICES):
            return Response({'error': 'Invalid character'}, status=status.HTTP_400_BAD_REQUEST)

        hogamdo, created = Hogamdo.objects.get_or_create(user=request.user, character=character)
        score = hogamdo.score

        # OpenAI Integration
        openai.api_key = settings.OPENAI_API_KEY
        
        system_prompt = f"You are {character}, a character in a dating sim. " \
                        f"Your affection score with the user is {score}. " \
                        f"If the score is high, be flirty and warm. If low, be cold and distant. " \
                        f"Respond to the user's message accordingly."

        try:
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4.1",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ]
            )
            reply = response.choices[0].message.content
            return Response({'reply': reply})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
