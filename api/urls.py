from django.urls import path
from .views import CharacterInfoView, ChatView, RegisterView, LoginView, LogoutView, UserView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/user/', UserView.as_view(), name='user'),
    path('character/<str:character>/info/', CharacterInfoView.as_view(), name='character-info'),
    path('character/<str:character>/chat/', ChatView.as_view(), name='character-chat'),
]
