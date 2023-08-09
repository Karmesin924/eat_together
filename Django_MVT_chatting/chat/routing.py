from django.urls import path
from chat import consumers

websocket_urlpatterns = [
    path("ws/chat/<str:room_pk>/open_chat/", consumers.OpenChatConsumer.as_asgi()),
    path("ws/chat/<str:room_pk>/matching_chat/", consumers.ChatConsumer.as_asgi()),
]
