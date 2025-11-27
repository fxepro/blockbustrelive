"""
URL patterns for transactions app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Placeholder for future viewsets
router = DefaultRouter()

urlpatterns = [
    # Transaction endpoints will be added here
    path('', include(router.urls)),
]

