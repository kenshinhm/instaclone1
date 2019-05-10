from django.db import models
from instaclone.users.models import User
from django.utils.encoding import python_2_unicode_compatible
from taggit.managers import TaggableManager
from django.utils import timezone
from django.contrib.humanize.templatetags.humanize import naturaltime


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
    tags = TaggableManager()

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.create_time)

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
