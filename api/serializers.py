from rest_framework import serializers
from .models import User, Transaction, Types, Match, Ticket, Odds, TicketOdds


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class TransactionUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Transaction
        fields = ('id', 'transaction_time', 'transaction_type', 'money', 'user')


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class TypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Types
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'


class MatchTypesSerializer(serializers.ModelSerializer):
    types = TypesSerializer()
    class Meta:
        model = Match
        fields = ('id', 'match_time', 'home', 'away', 'types')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'


class TicketTransactionSerializer(serializers.ModelSerializer):
    transaction = TransactionUserSerializer()
    class Meta:
        model = Ticket
        fields = ('id', 'total_odd', 'possible_gain', 'transaction')


class OddsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Odds
        fields = '__all__'


class OddsMatchSerializer(serializers.ModelSerializer):
    match = MatchTypesSerializer()
    class Meta:
        model = Ticket
        fields = ('id', 'odd_type', 'odd1', 'odd2', 'odd3', 'odd4', 'odd5', 'odd6', 'match')


class TicketOddsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketOdds
        fields = '__all__'


class AllSerializer(serializers.ModelSerializer):
    ticket = TicketTransactionSerializer()
    odds = OddsMatchSerializer()
    class Meta:
        model = Ticket
        fields = ('id', 'ticket', 'odds', 'odd', 'type_value')
