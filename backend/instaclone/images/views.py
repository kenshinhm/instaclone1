from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from instaclone.notifications.views import create_notification
from instaclone.users.serializers import ListUserSerializer
from instaclone.users.models import User


class Images(APIView):

    def get(self, request, format=None):

        user = request.user
        following_users = user.following.all()

        image_list = []

        # append image of followers
        for following_user in following_users:
            user_images = following_user.images.all()[:2]

            for user_image in user_images:
                image_list.append(user_image)

        # append my image
        my_images = user.images.all()[:2]

        for image in my_images:
            image_list.append(image)

        sorted_list = sorted(image_list, key=lambda image: image.create_time, reverse=True)

        serializer = serializers.ImageSerializer(sorted_list, many=True, context={'request': request})

        return Response(serializer.data)

    def post(self, request, format=None):

        user = request.user
        serializer = serializers.InputImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageDetail(APIView):

    def get(self, request, image_id):
        try:
            image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ImageSerializer(image, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, image_id):
        user = request.user
        try:
            image = models.Image.objects.get(id=image_id, creator=user)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        image.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, image_id):
        user = request.user
        try:
            image = models.Image.objects.get(id=image_id, creator=user)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # partial=True will make the partial update of field possible
        serializer = serializers.InputImageSerializer(image, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeImage(APIView):

    def get(self, request, image_id, format=None):

        likes = models.Like.objects.filter(image__id=image_id)

        like_creators_id = likes.values('creator_id')
        # print(likes.values())
        users = User.objects.filter(id__in=like_creators_id)
        serializer = ListUserSerializer(users, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, image_id, format=None):

        user = request.user

        try:
            like_image = models.Image.objects.get(id=image_id)
        except Exception as ex:
            print(ex)
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            existing_like = models.Like.objects.get(
                creator=user,
                image=like_image
            )

            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoesNotExist:
            new_like = models.Like.objects.create(
                creator=user,
                image=like_image
            )
            new_like.save()

            # create notification
            create_notification(user, like_image.creator, 'like', like_image)

            return Response(status=status.HTTP_201_CREATED)


class UnlikeImage(APIView):

    def delete(self, request, image_id, format=None):

        user = request.user

        try:
            like_image = models.Image.objects.get(id=image_id)
        except Exception as ex:
            print(ex)
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            existing_like = models.Like.objects.get(
                creator=user,
                image=like_image
            )
            existing_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:

            return Response(status=status.HTTP_304_NOT_MODIFIED)


class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user, image=found_image)

            # create notification
            create_notification(user, found_image.creator, 'comment', found_image, serializer.data['message'])

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteMyComment(APIView):

    def delete(self, request, image_id, comment_id):

        user = request.user

        try:
            comment_to_delete = models.Comment.objects.get(id=comment_id, image__id=image_id, image__creator=user)
            comment_to_delete.delete()
        except models.Comment.DoesNotExist:
            comment = models.Comment.objects.get(id=comment_id)
            if comment.image.creator != user:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)


class Comment(APIView):

    def delete(self, request, comment_id):

        user = request.user

        try:
            comment = models.Comment.objects.get(id=comment_id, creator=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class Search(APIView):

    def get(self, request):

        hashtags = request.query_params.get('hashtags', None)

        if hashtags is not None:
            hashtags = hashtags.split(',')
            images = models.Image.objects.filter(tags__name__in=hashtags).distinct()
            serializer = serializers.HashTagSerializer(images, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
