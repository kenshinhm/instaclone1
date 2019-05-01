from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path("", view=views.Notifications.as_view(), name="notifications"),
]
