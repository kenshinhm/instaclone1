from django.db import models
from instaclone.users.models import User
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class TimestampModel(models.Model):

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Image(TimestampModel):
    """ Image Model """

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='images')

    @property
    def like_count(self):
        return self.likes.all().count()

    def __str__(self):
        return 'Location: {} - Caption: {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-create_time']


@python_2_unicode_compatible
class Comment(TimestampModel):
    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='comments')

    def __str__(self):
        return self.message


@python_2_unicode_compatible
class Like(TimestampModel):
    """ Like Model """

    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='likes')

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)
