from django.urls import path
from chat import views

app_name = "chat"

urlpatterns = [
    path("", views.index, name="index"),
    path("new_open_room/", views.open_room_new, name="open_room_new"),
    path("new_matching_room/", views.MatchingRoomNew.as_view(), name="matching_room_new"),  # Rest API
    path("<str:room_pk>/open_chat/", views.open_room_chat, name="open_room_chat"),
    path("<str:room_pk>/matching_chat/", views.matching_room_chat, name="matching_room_chat"),
    path("<str:room_pk>/open_room_delete/", views.open_room_delete, name="open_room_delete"),
    path("<str:room_pk>/exit_matching_room/", views.exit_matching_room, name="exit_matching_room"),
    path("<int:room_pk>/open_room_users/", views.open_room_users, name="open_room_users"),
    path("<str:room_pk>/open_chat_messages/", views.open_chat_messages, name="open_chat_messages"),  # Rest API
    path("<str:room_pk>/matching_chat_messages/", views.matching_chat_messages, name="matching_chat_messages"), # Rest API
]
