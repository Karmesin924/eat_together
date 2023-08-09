from django.urls import path
from chat import views

app_name = "chat"

urlpatterns = [
    path("", views.index, name="index"),
    path("new_open_room/", views.open_room_new, name="open_room_new"),
    path("<str:room_pk>/chat/", views.room_chat, name="room_chat"),
    path("<str:room_pk>/delete/", views.room_delete, name="room_delete"),
    path("new_matching_room/", views.MatchingRoomNew.as_view(), name="matching_room_new"), #API
]
