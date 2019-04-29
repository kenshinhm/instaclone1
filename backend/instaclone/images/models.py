from django.db import models
from instaclone.users.models import User

# Create your models here.


class TimestampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Image(TimestampModel):
    """ Image Model """

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


class Comment(TimestampModel):
    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True)


class Like(TimestampModel):
    """ Like Model """

    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True)
