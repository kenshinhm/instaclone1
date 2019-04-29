from django.contrib import admin
from .models import Image, Like, Comment


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


