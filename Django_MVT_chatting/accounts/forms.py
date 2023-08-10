from django import forms


class LoginForm(forms.Form):
    email = forms.EmailField(
        required=True,
        label="이메일"
    )

    username = forms.CharField(
        widget=forms.TextInput(attrs={'autofocus': True}),
        required=True,
        label="닉네임"
    )

    password = forms.CharField(
        widget=forms.PasswordInput,
        required=True,
        label="비밀번호"
    )