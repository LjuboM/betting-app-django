from django.contrib import admin
from .models import User, Transaction, Types, Match

# Register your models here.
admin.site.register(User)
admin.site.register(Transaction)
admin.site.register(Types)
admin.site.register(Match)
