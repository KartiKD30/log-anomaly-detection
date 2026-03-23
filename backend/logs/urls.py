from django.urls import path
from .views import upload_file, get_logs

urlpatterns = [
    path("upload/", upload_file),
    path("logs/", get_logs),  # 🔥 NEW API
]