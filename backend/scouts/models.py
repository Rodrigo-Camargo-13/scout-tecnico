# scouts/models.py
from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=50)
    age = models.IntegerField()
    goals = models.IntegerField()
    assists = models.IntegerField()
    shots = models.IntegerField()

    def __str__(self):
        return self.name