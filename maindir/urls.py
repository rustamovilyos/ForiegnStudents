from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
    path('', include('studentapp.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
