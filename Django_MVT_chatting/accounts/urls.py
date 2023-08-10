from django.urls import path
from accounts import views
from accounts.views import SignupAPIView, LoginView

app_name = "accounts"
urlpatterns = [
    path("signup/", SignupAPIView.as_view(), name="signup"), #Rest API
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", views.logout, name="logout"),
]
