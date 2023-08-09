from django.urls import path
from chat import views

app_name = "chat"

urlpatterns = [
    path("", views.index, name="index"),
    path("new_open_room/", views.open_room_new, name="open_room_new"),
    path("new_matching_room/", views.MatchingRoomNew.as_view(), name="matching_room_new"),  # Rest API
    path("<str:room_pk>/open_chat/", views.open_room_chat, name="open_room_chat"),
    path("<str:room_pk>/matching_chat/", views.matching_room_chat, name="matching_room_chat"),
    path("<str:room_pk>/delete/", views.room_delete, name="room_delete"),
]
