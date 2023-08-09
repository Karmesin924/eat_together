from django.urls import path
from accounts import views
from accounts.views import SignupAPIView, ChatLoginView
from chat.views import index

app_name = "accounts"
urlpatterns = [
    path("signup/", SignupAPIView.as_view(), name="signup"), #Rest API
    path("login/", ChatLoginView.as_view(), name="login"),
    path("logout/", views.logout, name="logout"),
    path("profile/", index, name="profile"),    #로그인 시 메인 페이지로 이동
]
