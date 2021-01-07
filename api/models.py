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


class Types(models.Model):
    name = models.CharField(max_length=40)
    type1 = models.CharField(max_length=10)
    type2 = models.CharField(max_length=10)
    type3 = models.CharField(max_length=10)
    type4 = models.CharField(max_length=10)
    type5 = models.CharField(max_length=10)
    type6 = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Match(models.Model):
    match_time = models.DateTimeField()
    home = models.CharField(max_length=40)
    away = models.CharField(max_length=40)
    types = models.ForeignKey(Types, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s" % (self.home, self.away)


class Odds(models.Model):
    odd_type = models.CharField(max_length=15)
    odd1 = models.FloatField()
    odd2 = models.FloatField()
    odd3 = models.FloatField()
    odd4 = models.FloatField()
    odd5 = models.FloatField()
    odd6 = models.FloatField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Ticket(models.Model):
    total_odd = models.FloatField()
    possible_gain = models.FloatField()
    ticket_odds = models.ManyToManyField(Odds, through='TicketOdds')

    def __str__(self):
        return "%s %s" % (self.total_odd, self.possible_gain)


class TicketOdds(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    odds = models.ForeignKey(Odds, on_delete=models.CASCADE)
    odd = models.FloatField()
    type_value = models.CharField(max_length=15)
