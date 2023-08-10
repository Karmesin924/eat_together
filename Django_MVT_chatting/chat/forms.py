from django import forms
from .models import OpenRoom, MatchingRoom


class RoomForm(forms.ModelForm):
    class Meta:
        model = OpenRoom
        fields = ["name"]

class MatchingRoomForm(forms.ModelForm):
    class Meta:
        model = MatchingRoom
        fields = ["name"]
