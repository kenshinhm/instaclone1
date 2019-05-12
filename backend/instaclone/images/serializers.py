from rest_framework import serializers
from .models import Comment, Like, Image
from instaclone.users.models import User
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)


class CountImageSerializer(serializers.ModelSerializer):

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


class SmallImageSerializer(serializers.ModelSerializer):

    """Used for Notifications"""

    class Meta:
        model = Image
        fields = (
            'file',
        )


class InputImageSerializer(serializers.ModelSerializer):

    # To make some field required=false
    # file = serializers.FileField(required=False)

    class Meta:
        model = Image
        fields = (
            'file',
            'location',
            'caption',
        )


class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):

    comments = CommentSerializer(many=True)
    creator = UserSerializer()
    tags = TagListSerializerField()
    is_liked = serializers.SerializerMethodField()

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
            'natural_time',
            'tags',
            'is_liked',
        )

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                Like.objects.get(creator__id=request.user.id, image__id=obj.id)
                return True
            except Like.DoesNotExist:
                return False

        return False


class HashTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = (
            'id',
            'file',
            'comment_count',
            'like_count',
            'caption',
        )




