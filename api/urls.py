from django.urls import path
from .views import UserView, UsersView, TransactionView, TransactionsView

urlpatterns = [
    path('api/user/<int:id>/', UserView.as_view()),
    path('api/user/', UsersView.as_view()),

    path('api/transaction/<int:id>/', TransactionView.as_view()),
    path('api/transaction/', TransactionsView.as_view()),
]
