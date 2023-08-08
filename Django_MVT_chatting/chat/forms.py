from django import forms
from .models import OpenRoom


class RoomForm(forms.ModelForm):
    class Meta:
        model = OpenRoom
        fields = ["name"]
