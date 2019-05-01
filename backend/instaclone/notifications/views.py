from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers


class Notifications(APIView):

    def get(self, request):

        user = request.user
        notifications = models.Notification.objects.filter(user_to=user)
        serializer = serializers.NotificationSerializer(notifications, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


def create_notification(user_from, user_to, notification_type, image=None, comment=None):

    print(user_from, user_to, notification_type, image, comment)

    notifications = models.Notification.objects.create(
        user_to=user_to,
        user_from=user_from,
        notification_type=notification_type,
        image=image,
        comment=comment
    )

    notifications.save()
