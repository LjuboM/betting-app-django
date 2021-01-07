from rest_framework import serializers
from .models import User, Transaction, Types, Match


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
