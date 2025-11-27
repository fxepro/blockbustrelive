"""
URL patterns for accounts app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenBlacklistView

from . import views

# Router for viewsets (if any)
router = DefaultRouter()

urlpatterns = [
    # Authentication endpoints
    path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    
    # Email verification
    path('verify-email/<str:uidb64>/<str:token>/', views.EmailVerificationView.as_view(), name='verify_email'),
    
    # Password management
    path('password/change/', views.PasswordChangeView.as_view(), name='password_change'),
    path('password/reset/', views.PasswordResetView.as_view(), name='password_reset'),
    path('password/reset/confirm/<str:uidb64>/<str:token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    # User profile management
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('profile/update/', views.UserUpdateView.as_view(), name='user_update'),
    path('dashboard/', views.user_dashboard, name='user_dashboard'),
    
    # KYC and verification
    path('kyc/request/', views.kyc_verification_request, name='kyc_request'),
    
    # Admin status check
    path('admin-status/', views.check_admin_status, name='admin_status'),
    
    # Role management (admin only)
    path('roles/', views.RoleListView.as_view(), name='role_list'),
    
    # Include router URLs
    path('', include(router.urls)),
]

