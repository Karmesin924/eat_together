from rest_framework import serializers
from .models import OpenRoomMessage, MatchingRoomMessage


class OpenRoomMessageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = OpenRoomMessage
        fields = ['user', 'room', 'content', 'timestamp']

class MatchingRoomMessageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = MatchingRoomMessage
        fields = ['user', 'room', 'content', 'timestamp']
