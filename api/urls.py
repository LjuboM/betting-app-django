from django.urls import path
from .views import UserView, UsersView, TransactionView, TransactionsView, TypesPerSportView, TypesView, MatchView, MatchesView, TicketView, TicketsView, OddsPerMatchView, OddsView, TicketOddsDetailsView, TicketOddsView

urlpatterns = [
    path('user/<int:id>/', UserView.as_view()),
    path('user/', UsersView.as_view()),

    path('transaction/<int:id>/', TransactionView.as_view()),
    path('transaction/', TransactionsView.as_view()),

    path('types/<int:id>/', TypesPerSportView.as_view()),
    path('types/', TypesView.as_view()),

    path('match/<int:id>/', MatchView.as_view()),
    path('match/', MatchesView.as_view()),

    path('ticket/<int:id>/', TicketView.as_view()),
    path('ticket/', TicketsView.as_view()),

    path('odds/<int:id>/', OddsPerMatchView.as_view()),
    path('odds/', OddsView.as_view()),

    path('ticketOdds/<int:id>/', TicketOddsDetailsView.as_view()),
    path('ticketOdds/', TicketOddsView.as_view())
]
