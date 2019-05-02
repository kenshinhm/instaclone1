from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from instaclone.notifications.views import create_notification
from . import models, serializers


class ExploreUsers(APIView):

    def get(self, request, format=None):

        last_five = models.User.objects.all().order_by('-date_joined')[:5]
        serializer = serializers.ExploreUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.add(user_to_follow)
        user.save()

        # create notification
        create_notification(user, user_to_follow, 'follow')

        return Response(status=status.HTTP_200_OK)


class UnfollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_unfollow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.remove(user_to_unfollow)
        user.save()

        return Response(status=status.HTTP_200_OK)


class UserProfile(APIView):

    def get_user(self, username):

        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, username, format=None):

        found_user = self.get_user(username)
        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, username):

        user = request.user
        found_user = self.get_user(username)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        elif found_user.username != user.username:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            serializer = serializers.UserProfileSerializer(found_user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserFollowers(APIView):

    def get(self, _, username):

        try:
            found_users = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_users.followers.all()
        serializer = serializers.FollowersSerializer(user_followers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class GetUserFollowing(APIView):

    def get(self, _, username):

        try:
            found_users = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_users.following.all()
        serializer = serializers.FollowingSerializer(user_following, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


# Function based Views for GetUserFollowing
# @api_view(['GET'])
# def getUserFollowing(request, username):
#
#     if request.method == "GET":
#
#         try:
#             found_users = models.User.objects.get(username=username)
#         except models.User.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#
#         user_following = found_users.following.all()
#         serializer = serializers.FollowingSerializer(user_following, many=True)
#
#         return Response(data=serializer.data, status=status.HTTP_200_OK)


class SearchUser(APIView):

    def get(self, request):

        username = request.query_params.get('username', None)

        if username is not None:
            users = models.User.objects.filter(username__istartswith=username)
            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):

    def put(self, request, username):

        user = request.user

        if user.username == username:
            current_password = request.data.get('current_password', None)

            if current_password is not None:
                password_match = user.check_password(current_password)

                if password_match:
                    new_password = request.data.get('new_password', None)

                    if new_password is not None:
                        user.set_password(new_password)
                        user.save()
                        return Response(status=status.HTTP_200_OK)

                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)

                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter






