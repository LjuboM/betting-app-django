from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('tickets', index),
    path('transactions', index),
    path('addMoney', index),
    path('logOut', index)
]
