from django.db import models
from instaclone.users.models import User
from instaclone.images.models import Image, TimestampModel
from django.utils.encoding import python_2_unicode_compatible
from taggit.managers import TaggableManager


class Notification(TimestampModel):

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow'),
    )

    user_from = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='user_from')
    user_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='user_to')
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True, related_name='image')
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return 'From: {} - To: {}'.format(self.user_from, self.user_to)

    class Meta:
        ordering = ['-create_time']


