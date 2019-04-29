from django.db import models

# Create your models here.


class TimestampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Image(TimestampModel):

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()


class Comment(TimestampModel):

    message = models.TextField()
