"""
URL configuration for blockbustre project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger/OpenAPI Schema
schema_view = get_schema_view(
    openapi.Info(
        title="BlockBustre API",
        default_version='v1',
        description="Blockchain Registration Service API",
        terms_of_service="https://www.blockbustre.com/terms/",
        contact=openapi.Contact(email="contact@blockbustre.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    
    # API Endpoints
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/contracts/', include('apps.contracts.urls')),
    path('api/v1/transactions/', include('apps.transactions.urls')),
    path('api/v1/core/', include('apps.core.urls')),
    
    # Django Allauth
    path('accounts/', include('allauth.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

