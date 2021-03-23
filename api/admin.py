from django.contrib import admin
from .models import (
    User,
    Transaction,
    Types,
    Match,
    Odds,
    Ticket,
    TicketOdds
)

admin.site.register(User)
admin.site.register(Transaction)
admin.site.register(Types)
admin.site.register(Match)
admin.site.register(Odds)
admin.site.register(Ticket)
admin.site.register(TicketOdds)
