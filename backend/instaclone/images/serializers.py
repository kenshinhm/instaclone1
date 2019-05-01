from rest_framework import serializers
from .models import Comment, Like, Image
from instaclone.users.models import User


class UserProfileImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = (
            'id',
            'file',
            'comment_count',
            'like_count',
        )


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'username',
            'profile_image',
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = (
            'id',
            'message',
            'creator',
        )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    creator = UserSerializer()

    class Meta:
        model = Image
        fields = (
            'id',
            'creator',
            'file',
            'location',
            'caption',
            'comments',
            'like_count',
        )




