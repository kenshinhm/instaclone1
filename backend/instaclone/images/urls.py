from django.conf.urls import url
from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path("", view=views.Images.as_view(), name="feed"),
    path("<int:image_id>/", view=views.ImageDetail.as_view(), name="image_detail"),
    path("<int:image_id>/likes/", view=views.LikeImage.as_view(), name="like_image"),
    path("<int:image_id>/unlikes/", view=views.UnlikeImage.as_view(), name="unlike_image"),
    path("<int:image_id>/comment/", view=views.CommentOnImage.as_view(), name="comment_image"),
    path("<int:image_id>/comment/<int:comment_id>", view=views.DeleteMyComment.as_view(), name="delete_my_comment"),
    path("comments/<int:comment_id>/", view=views.Comment.as_view(), name="comment"),
    path("search/", view=views.Search.as_view(), name="search")
]