from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # ✅ CORRECT APP NAME
    path("api/", include("logs.urls")),
]