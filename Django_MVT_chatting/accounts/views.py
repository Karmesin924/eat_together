from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import TemplateView, CreateView
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from accounts.forms import CustomAuthenticationForm
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


class ChatLoginView(LoginView):
    template_name = "partials/form.html"
    authentication_form = CustomAuthenticationForm
    extra_context = {
        "form_name": "로그인",
        "submit_label": "로그인"
    }


logout = LogoutView.as_view(
    next_page="accounts:login",
)


class ProfileView(LoginRequiredMixin, TemplateView):
    template_name = "accounts/profile.html"


profile = ProfileView.as_view()
