from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=40)
    location = models.CharField(max_length=40)
    age = models.IntegerField()
    money = models.IntegerField()

    def __str__(self):
        return self.name
