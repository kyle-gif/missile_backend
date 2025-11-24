from django.db import models
from django.contrib.auth.models import User

class Hogamdo(models.Model):
    CHARACTER_CHOICES = [
        ('lee', 'Lee'),
        ('seok', 'Seok'),
        ('hyun', 'Hyun'),
        ('ryu', 'Ryu'),
        ('yoon', 'Yoon'),
        ('choi', 'Choi'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    character = models.CharField(max_length=10, choices=CHARACTER_CHOICES)
    score = models.IntegerField(default=0)
    game_step = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'character')

    def __str__(self):
        return f"{self.user.username} - {self.character}: {self.score}"
