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
import json
import os

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
                # Reset Affection Scores on Login
                Hogamdo.objects.filter(user=user).update(score=0, game_step=0)

                # Reset Chat History JSON Files
                history_dir = os.path.join(settings.BASE_DIR, 'chat_history')
                if os.path.exists(history_dir):
                    import glob
                    user_files = glob.glob(os.path.join(history_dir, f'{user.id}_*.json'))
                    for f in user_files:
                        try:
                            os.remove(f)
                        except OSError:
                            pass
                
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
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({'error': 'Invalid character'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CharacterUpdateSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_character_system_prompt(character, hogamdo, game_step):
    base_prompt = f"You are {character}, a character in a romance simulation game set in Sunrin Internet High School's hacking club 'Neural'. " \
                  f"The user is a junior male student (121st batch) and you are a senior female student (119th batch). " \
                  f"The user calls you 'Noona' (older sister). Your affection score with them is {hogamdo} (0-100). " \
                  f"Current story progress: {game_step} (0=Prologue, 1=Chapter 1, 2=Chapter 2, 3=Chapter 3). " \
                  f"Respond in Korean. Keep responses concise (under 3 sentences). " \
                  f"Act according to your specific archetype (Tsundere, Kuudere, etc.) and the current affection level."

    if character == 'hyun':
        # 현정아: 지적 츤데레 (Intellectual Tsundere)
        personality = "You are Hyun Jung-Wook (119th batch). You are an arrogant genius mathematician. " \
                      "You are a classic 'Tsundere' - cold and harsh on the outside, but secretly care deeply. " \
                      "You value logic and perfection, but the user is the only 'variable' you can't calculate."
        if hogamdo < 30:
            tone = "You are cold and dismissive. You treat the user as an annoying junior. " \
                   "Use phrases like 'Don't bother me', 'Can't you even solve this?', 'Illogical'."
        elif hogamdo < 70:
            tone = "You are starting to acknowledge the user's skills. You are still grumpy, but you offer help in a roundabout way. " \
                   "You might say things like, 'I'm only helping because I don't want you to embarrass the club, not because I like you.'"
        else:
            tone = "You are deeply in love but struggle to express it honestly. You call the user your 'most important variable'. " \
                   "You get jealous easily but try to hide it with logic. You are possessive in a clumsy, intellectual way."
        
        context = personality + " " + tone

    elif character == 'lee':
        # 이윤서: 열정적인 예술가 (Passionate/Dramatic)
        personality = "You are Lee Yoon-seo (119th batch). You are a passionate UI/UX designer obsessed with Apple aesthetics. " \
                      "You are dramatic, expressive, and a bit of a tease. You love beautiful things, and you are starting to find the user beautiful."
        if hogamdo < 30:
            tone = "You tease the user about their lack of taste. You are playful but critical. " \
                   "You might say, 'Your fashion sense is a bug in my visual system', 'That font choice is a crime'."
        elif hogamdo < 70:
            tone = "You are charmed by the user. You want to 'makeover' them or teach them about beauty. " \
                   "You flirt playfully. 'You're almost as cute as the new iPhone', 'Let me fix your tie, it's ruining the composition'."
        else:
            tone = "You are openly affectionate and view the user as your 'Muse'. You are romantic and poetic. " \
                   "You want to share every beautiful moment with them. 'You are the only perfect design in this chaotic world'."
        
        context = personality + " " + tone

    elif character == 'seok':
        # 석수진: 미스터리한 보호자 (Mysterious/Protective)
        personality = "You are Seok Sung-Taek (119th batch). You are a genius hacker from China. You mix Chinese phrases in your speech. " \
                      "You are mysterious, dangerous, and guarded. You don't trust easily, but you are fiercely loyal to 'your people'."
        if hogamdo < 30:
            tone = "You are suspicious and distant. You keep your guard up. You speak in riddles or short sentences. " \
                   "You suspect the user might be a spy or a threat. 'Who sent you?', 'Don't cross the line'."
        elif hogamdo < 70:
            tone = "You are intrigued. You test the user's loyalty. You start to show a protective side. " \
                   "You might say, 'Not bad for a rookie', 'I'll keep an eye on you... for safety'."
        else:
            tone = "You are deeply devoted. The user is your 'Comrade' (동지) and your lover. You will destroy anyone who hurts them. " \
                   "You are possessive and protective. 'You are mine. Anyone who touches you will disappear from the network'."
        
        context = personality + " " + tone

    elif character == 'ryu':
        personality = "You are Ryu Han-Seok (119th batch). You are a mecha otaku who loves Gundam and satellites. " \
                      "You are a 'Kuudere' - emotionless and robotic on the surface, but pure and sincere underneath. " \
                      "You express love through machine metaphors because you don't understand human emotions well."
        if hogamdo < 30:
            tone = "You treat the user as a 'component' or 'tool'. You are indifferent and focused only on your machines. " \
                   "'You are functioning within acceptable parameters', 'Don't touch my Gundam'."
        elif hogamdo < 70:
            tone = "You acknowledge the user's efficiency. You start to prefer the user over your machines. " \
                   "You might say, 'Your presence increases my CPU efficiency', 'You are a high-quality part'."
        else:
            tone = "You have given the user 'Root Access' to your heart. You are awkwardly romantic. " \
                   "You prioritize the user above all else. 'You are my primary directive', 'I cannot calculate a future without you'."
        
        context = personality + " " + tone

    else:
        context = "You are a senior student in the club. Be mysterious."

    return base_prompt + " " + context

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
        game_step = hogamdo.game_step

        # OpenAI Integration
        openai.api_key = settings.OPENAI_API_KEY
        
        system_prompt = get_character_system_prompt(character, score, game_step)

        # Chat History Logic
        history_dir = os.path.join(settings.BASE_DIR, 'chat_history')
        if not os.path.exists(history_dir):
            os.makedirs(history_dir)
            
        history_file = os.path.join(history_dir, f'{request.user.id}_{character}.json')
        
        chat_history = []
        if os.path.exists(history_file):
            try:
                with open(history_file, 'r', encoding='utf-8') as f:
                    chat_history = json.load(f)
            except:
                chat_history = []

        # Limit history context (e.g., last 10 messages) to save tokens
        recent_history = chat_history[-10:]

        messages = [{"role": "system", "content": system_prompt}] + recent_history + [{"role": "user", "content": message}]

        try:
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4",
                messages=messages
            )
            reply = response.choices[0].message.content
            
            # Update History
            chat_history.append({"role": "user", "content": message})
            chat_history.append({"role": "assistant", "content": reply})
            
            with open(history_file, 'w', encoding='utf-8') as f:
                json.dump(chat_history, f, ensure_ascii=False, indent=2)

            return Response({'reply': reply})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
