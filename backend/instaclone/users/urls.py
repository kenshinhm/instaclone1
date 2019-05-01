from django.urls import path

from instaclone.users.views import (
    ExploreUsers,
    FollowUser,
    UnfollowUser,
    UserProfile,
    GetUserFollowers,
    GetUserFollowing,
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
    path("<slug:username>/", view=UserProfile.as_view(), name="user_profile"),
    path("<slug:username>/followers/", view=GetUserFollowers.as_view(), name="get_user_followers"),
    path("<slug:username>/following/", view=GetUserFollowing.as_view(), name="get_user_following"),
    # path("", view=user_list_view, name="list"),
    # path("~redirect/", view=user_redirect_view, name="redirect"),
    # path("~update/", view=user_update_view, name="update"),
    # path("<str:username>/", view=user_detail_view, name="detail"),
]

