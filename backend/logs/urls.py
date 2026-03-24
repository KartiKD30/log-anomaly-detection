from django.urls import path
from .views import login_with_otp, verify_otp, upload_file, get_logs

urlpatterns = [
    path("login-otp/", login_with_otp),
    path("verify-otp/", verify_otp),

    path("upload/", upload_file),
    path("logs/", get_logs),
]