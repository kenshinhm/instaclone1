from rest_framework import serializers
from . import models
from instaclone.images.serializers import UserProfileImageSerializer


class ExploreUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name',
            'following',
            'followers',
        )


class UserProfileSerializer(serializers.ModelSerializer):

    images = UserProfileImageSerializer(many=True)

    class Meta:
        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
            'images',
        )
