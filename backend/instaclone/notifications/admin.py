from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):

    list_display = (
        'user_from',
        'user_to',
        'notification_type',
        'create_time',
    )
