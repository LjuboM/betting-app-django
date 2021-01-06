from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=40)
    location = models.CharField(max_length=40)
    age = models.PositiveIntegerField()
    money = models.PositiveIntegerField()

    def __str__(self):
        return self.name

#min_value=0 for Transaction Model
def validate_money(value):
    if value < 1:
        raise ValidationError('Invalid HRK value.')


class Transaction(models.Model):
    transaction_time = models.DateTimeField()
    transaction_type = models.BooleanField(default=False)
    money = models.PositiveIntegerField(validators=[validate_money])
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s %s %s" % (self.id, self.transaction_time, self.transaction_type, self.money)
