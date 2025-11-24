from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Hogamdo

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class CharacterInfoSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='character')
    hogamdo = serializers.IntegerField(source='score')

    class Meta:
        model = Hogamdo
        fields = ('name', 'hogamdo', 'game_step')
