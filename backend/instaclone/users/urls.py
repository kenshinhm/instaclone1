from django.urls import path

from instaclone.users.views import (
    ExploreUsers,
    FollowUser,
    UnfollowUser,
    # user_list_view,
    # user_redirect_view,
    # user_update_view,
    # user_detail_view,
)

app_name = "users"
urlpatterns = [
    path("explore/", view=ExploreUsers.as_view(), name="explore_users"),
    path("<int:user_id>/follow", view=FollowUser.as_view(), name="follow_user"),
    path("<int:user_id>/unfollow", view=UnfollowUser.as_view(), name="unfollow_user"),
    # path("", view=user_list_view, name="list"),
    # path("~redirect/", view=user_redirect_view, name="redirect"),
    # path("~update/", view=user_update_view, name="update"),
    # path("<str:username>/", view=user_detail_view, name="detail"),
]

