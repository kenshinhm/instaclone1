from rest_framework import serializers
from . import models
from instaclone.users.serializers import ListUserSerializer
from instaclone.images.serializers import SmallImageSerializer


class NotificationSerializer(serializers.ModelSerializer):

    user_from = ListUserSerializer()
    user_to = ListUserSerializer()
    image = SmallImageSerializer()

    class Meta:
        model = models.Notification
        fields = '__all__'
