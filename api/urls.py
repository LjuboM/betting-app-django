from django.urls import path
from .views import UserView, UsersView, TransactionView, TransactionsView, TypesPerSportView, TypesView, MatchView, MatchesView

urlpatterns = [
    path('api/user/<int:id>/', UserView.as_view()),
    path('api/user/', UsersView.as_view()),

    path('api/transaction/<int:id>/', TransactionView.as_view()),
    path('api/transaction/', TransactionsView.as_view()),

    path('api/types/<int:id>/', TypesPerSportView.as_view()),
    path('api/types/', TypesView.as_view()),

    path('api/match/<int:id>/', MatchView.as_view()),
    path('api/match/', MatchesView.as_view()),
]
