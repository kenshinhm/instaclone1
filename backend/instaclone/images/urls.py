from django.conf.urls import url
from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    # url(
    #     regex=r'^all/$',
    #     view=views.ListAllImages.as_view(),
    #     name='all_images'
    # )
    path("all/", view=views.ListAllImages.as_view(), name="all_images"),
]


# urlpatterns = [
#     path("", view=user_list_view, name="list"),
#     path("~redirect/", view=user_redirect_view, name="redirect"),
#     path("~update/", view=user_update_view, name="update"),
#     path("<str:username>/", view=user_detail_view, name="detail"),
# ]