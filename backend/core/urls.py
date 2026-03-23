from django.contrib import admin
from django.urls import path
from logs import views   # ✅ FIX HERE

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/upload/', views.upload_file),
    path('api/logs/', views.get_logs),
]