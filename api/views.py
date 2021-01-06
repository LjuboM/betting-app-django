from .models import User
from django.shortcuts import render
from .serializers import UserSerializer
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
