from django.urls import path
from .views import UserView, UsersView

urlpatterns = [
    path('user/<int:id>/', UserView.as_view()),
    path('user/', UsersView.as_view()),

]