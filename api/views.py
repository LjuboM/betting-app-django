from .models import User, Transaction, Types, Match, Ticket, Odds, TicketOdds
from django.shortcuts import render
from .serializers import UserSerializer, TransactionUserSerializer, TransactionSerializer, TypesSerializer, MatchSerializer, TicketSerializer, TicketTransactionSerializer, OddsSerializer, OddsMatchSerializer, TicketOddsSerializer, AllSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

#function for getting object of model "model" with id "id"
def get_object(id, model):
    try:
        return model.objects.get(id=id)

    except model.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


class UserView(APIView):

    def get(self, request, id):
        user = get_object(id, User)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, id):
        user = get_object(id, User)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user = get_object(id, User)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UsersView(APIView):

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionView(APIView):

    def get(self, request, id):
        transaction = get_object(id, Transaction)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)
    
    def put(self, request, id):
        transaction = get_object(id, Transaction)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        transaction = get_object(id, Transaction)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TransactionsView(APIView):

    #get all the transactions in descending ordered
    def get(self, request):
        transactions = Transaction.objects.all().order_by('-transaction_time')
        serializer = TransactionUserSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            user = get_object(request.data['user'], User)
            user.money = user.money + request.data['money']
            user.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TypesPerSportView(APIView):

    def get(self, request, id):
        types = get_object(id, Types)
        serializer = TypesSerializer(types)
        return Response(serializer.data)
    
    def put(self, request, id):
        types = get_object(id, Types)
        serializer = TypesSerializer(types, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        types = get_object(id, Types)
        types.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TypesView(APIView):

    def get(self, request):
        types = Types.objects.all()
        serializer = TypesSerializer(types, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TypesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MatchView(APIView):

    def get(self, request, id):
        match = get_object(id, Match)
        serializer = MatchSerializer(match)
        return Response(serializer.data)
    
    def put(self, request, id):
        match = get_object(id, Match)
        serializer = MatchSerializer(match, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        match = get_object(id, Match)
        match.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MatchesView(APIView):

    def get(self, request):
        match = Match.objects.all()
        serializer = MatchSerializer(match, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MatchSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TicketView(APIView):

    def get(self, request, id):
        ticket = get_object(id, Ticket)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data)
    
    def put(self, request, id):
        ticket = get_object(id, Ticket)
        serializer = TicketSerializer(ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        ticket = get_object(id, Ticket)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TicketsView(APIView):

    def get(self, request):
        ticket = Ticket.objects.all()
        serializer = TicketSerializer(ticket, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TicketSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OddsPerMatchView(APIView):

    def get(self, request, id):
        odds = get_object(id, Odds)
        serializer = OddsSerializer(odds)
        return Response(serializer.data)
    
    def put(self, request, id):
        odds = get_object(id, Odds)
        serializer = OddsSerializer(odds, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        odds = get_object(id, Odds)
        odds.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OddsView(APIView):

    def get(self, request):
        odds = Odds.objects.all()
        serializer = OddsSerializer(odds, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OddsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
