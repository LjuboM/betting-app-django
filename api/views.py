from .models import User, Transaction, Types, Match, Ticket, Odds, TicketOdds
from django.shortcuts import render
from .serializers import UserSerializer, TransactionUserSerializer, TransactionSerializer, TypesSerializer, MatchSerializer, TicketSerializer, TicketTransactionSerializer, OddsSerializer, OddsMatchSerializer, TicketOddsSerializer, AllSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.utils import timezone
import pytz
from django.views.decorators.csrf import csrf_exempt
from braces.views import CsrfExemptMixin

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
    #Basic user can't use this, for future this could be allowed but only for some fiels.
    def put(self, request, id):
        user = get_object(id, User)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #Basic user can't use this 
    def delete(self, request, id):
        user = get_object(id, User)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UsersView(APIView):
    #Basic user can't use this 
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    #Basic user can't use this 
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionView(APIView):
    #Basic user can't use this 
    def get(self, request, id):
        transaction = get_object(id, Transaction)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)
    #In Future possible upgrade: get current money value and change it according to Put new value.
    #meaning if Admin changed the transaction because it was wrong.
    def put(self, request, id):
        transaction = get_object(id, Transaction)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #In future possible upgrade: Deleting transaction can have 2 outcomes: If basic user deletes it nothing changes in money value of the User,
    #if admin deletes it then the reason might be because the transaction is wrong.
    def delete(self, request, id):
        transaction = get_object(id, Transaction)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TransactionsView(CsrfExemptMixin, APIView):
    authentication_classes = []
    #get all the transactions in descending ordered
    def get(self, request):
        transactions = Transaction.objects.all().order_by('-transaction_time')
        serializer = TransactionUserSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object(request.data['user'], User)
            user.money = user.money + request.data['money']
            user.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TypesPerSportView(APIView):
    #Basic user can't use this 
    def get(self, request, id):
        types = get_object(id, Types)
        serializer = TypesSerializer(types)
        return Response(serializer.data)
    #Basic user can't use this 
    def put(self, request, id):
        types = get_object(id, Types)
        serializer = TypesSerializer(types, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #Basic user can't use this 
    def delete(self, request, id):
        types = get_object(id, Types)
        types.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TypesView(APIView):

    def get(self, request):
        types = Types.objects.all()
        serializer = TypesSerializer(types, many=True)
        return Response(serializer.data)
    #Basic user can't use this 
    def post(self, request):
        serializer = TypesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MatchView(APIView):
    #Basic user can't use this 
    def get(self, request, id):
        match = get_object(id, Match)
        serializer = MatchSerializer(match)
        return Response(serializer.data)
    #Basic user can't use this    
    def put(self, request, id):
        match = get_object(id, Match)
        serializer = MatchSerializer(match, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #Basic user can't use this
    def delete(self, request, id):
        match = get_object(id, Match)
        match.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MatchesView(APIView):
    #Basic user can't use this 
    def get(self, request):
        match = Match.objects.all()
        serializer = MatchSerializer(match, many=True)
        return Response(serializer.data)
    #Basic user can't use this
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
    #Ticket should not be edited from here. but leaving this option for now.
    def put(self, request, id):
        ticket = get_object(id, Ticket)
        serializer = TicketSerializer(ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #Ticket is not supposed to be deleted from here... but leaving this option for now.
    def delete(self, request, id):
        ticket = get_object(id, Ticket)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TicketsView(APIView):

    def get(self, request):
        ticket = Ticket.objects.all()
        serializer = TicketSerializer(ticket, many=True)
        return Response(serializer.data)
    #Tickets are not supposed to be added trough this option... but leaving this option for now.
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
    #Basic user can't use this
    def put(self, request, id):
        odds = get_object(id, Odds)
        serializer = OddsSerializer(odds, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #Basic user can't use this
    def delete(self, request, id):
        odds = get_object(id, Odds)
        odds.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OddsView(APIView):

    def get(self, request):
        odds = Odds.objects.filter(match__match_time__gte=timezone.now())
        serializer = OddsMatchSerializer(odds, many=True)
        return Response(serializer.data)
    #Basic user can't use this
    def post(self, request):
        serializer = OddsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TicketOddsDetailsView(APIView):

    def get(self, request, id):
        ticketOdds = get_object(id, TicketOdds)
        serializer = AllSerializer(ticketOdds)
        return Response(serializer.data)
    #basic user can't use this. leaving this option for future for Admins, would have to adopt it, should change to different serializer?
    def put(self, request, id):
        ticketOdds = get_object(id, TicketOdds)
        serializer = TicketOddsSerializer(ticketOdds, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #basic user can't use this. leaving this option for future for Admins, would have to adopt it, should change to different serializer?
    def delete(self, request, id):
        ticketOdds = get_object(id, TicketOdds)
        ticketOdds.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TicketOddsView(CsrfExemptMixin, APIView):
    authentication_classes = []
    #Basic user can't use this, gets all pairs of all tickets
    def get(self, request):
        ticketOdds = TicketOdds.objects.all()
        serializer = TicketOddsSerializer(ticketOdds, many=True)
        return Response(serializer.data)
    #Still needs validations !!!
    def post(self, request):
        #Add validations !!!
        user_id = request.data[0]['ticket']['transaction']['user']
        user = get_object(user_id, User)
        user.money = user.money - request.data[0]['ticket']['transaction']['money']
        user.save()
        transaction = request.data[0]['ticket']['transaction']
        transaction['transaction_type'] = 'True'
        transaction_serializer = TransactionSerializer(data=transaction)
        if transaction_serializer.is_valid():
            transaction_serializer.save()
        else:
            return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        ticket = request.data[0]['ticket']
        ticket['transaction'] = Transaction.objects.latest('id').id
        ticket_serializer = TicketSerializer(data=ticket)
        if ticket_serializer.is_valid():
            ticket_serializer.save()
        else:
            return Response(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        ticketOdds = request.data
        for ticketOdd in ticketOdds:
            ticketOdd['ticket'] = Ticket.objects.latest('id').id
            #I must remove those odds in frontend, I don't need to send them!!!
            ticketOdd['odds'] = ticketOdd['odds']['id']

            ticketOdd_serializer = TicketOddsSerializer(data=ticketOdd)
            if ticketOdd_serializer.is_valid():
                print('ticketOdd uredu') ##remove
                ticketOdd_serializer.save()
            else:
                #this should happen rarely, so deleting after save is not big problem
                Transaction.objects.latest('id').delete()
                Ticket.objects.latest('id').delete()
                #return old money value because Bet is not valid.
                user.money = user.money + transaction['money']
                user.save()
                return Response(ticketOdd_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_201_CREATED)

#IMPORTANT: do we need serializer.data=?? in post put and etc methods... return Response(serializer.data, status=status.HTTP_201_CREATED) !!!