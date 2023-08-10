from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.views import LogoutView
from django.views.generic import FormView
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from accounts.forms import LoginForm
from accounts.serializers import UserSerializer


class SignupAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        request.data['username'] = request.data.pop('nickname', None)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(FormView):
    template_name = "partials/form.html"
    form_class = LoginForm
    success_url = '/'

    def form_valid(self, form):
        username = form.cleaned_data['username']
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']

        user = authenticate(self.request, username=username, password=password)

        if user is not None:
            login(self.request, user)
            return super().form_valid(form)
        else:
            form.add_error(None, "이메일, 닉네임 또는 비밀번호가 올바르지 않습니다.")
            return self.form_invalid(form)

logout = LogoutView.as_view(
    next_page="accounts:login",
)
