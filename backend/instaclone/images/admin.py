from django.contrib import admin
from .models import Image, Like, Comment


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):

    list_display_links = (
        'location',
    )

    search_fields = (
        'location',
        'caption',
    )

    list_filter = (
        'location',
        'creator',
    )

    list_display = (
        'file',
        'location',
        'caption',
        'creator',
        'create_time',
        'update_time',
    )


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = (
        'creator',
        'image',
        'create_time',
        'update_time',
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'message',
        'creator',
        'image',
        'create_time',
        'update_time',
    )


