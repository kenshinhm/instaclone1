from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers


class Feed(APIView):

    def get(self, request, format=None):

        user = request.user
        following_users = user.following.all()

        image_list = []

        for following_user in following_users:
            user_images = following_user.images.all()[:2]

            for user_image in user_images:
                image_list.append(user_image)

        sorted_list = sorted(image_list, key=lambda image: image.create_time, reverse=True)

        serializer = serializers.ImageSerializer(sorted_list, many=True)

        return Response(serializer.data)


class LikeImage(APIView):

    def get(self, request, image_id, format=None):

        user = request.user

        try:
            like_image = models.Image.objects.get(id=image_id)
        except Exception as ex:
            print(ex)
            return Response(status=404)

        new_like = models.Like.objects.create(
            creator=user,
            image=like_image
        )

        new_like.save()

        return Response(status=200)
