"""
URL patterns for contracts app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Placeholder for future viewsets
router = DefaultRouter()

urlpatterns = [
    # Contract endpoints will be added here
    path('', include(router.urls)),
]

