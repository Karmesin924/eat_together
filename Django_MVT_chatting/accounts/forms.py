from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomAuthenticationForm(AuthenticationForm):
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'autofocus': True}),
        required=False  # 사용 X
    )
