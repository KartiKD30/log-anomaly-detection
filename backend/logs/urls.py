from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ THIS FIXES EVERYTHING
    path('api/', include('core.api_urls')),
]