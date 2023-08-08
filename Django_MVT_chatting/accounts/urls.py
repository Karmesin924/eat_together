from django.urls import path
from accounts import views
from accounts.views import SignupAPIView, CustomLoginView

app_name = "accounts"
urlpatterns = [
    # path("signup/", views.signup, name="signup"),
    path("signup/", SignupAPIView.as_view(), name="signup"),
    path("login/", CustomLoginView.as_view(), name="login"),
    path("logout/", views.logout, name="logout"),
    path("profile/", views.profile, name="profile"),
]
