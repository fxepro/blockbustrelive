"""
Authentication and user management views.
"""
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import login, logout
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import transaction

from .models import User, UserProfile, Role, UserSession, LoginAttempt
from .serializers import (
    UserRegistrationSerializer, UserSerializer, UserUpdateSerializer,
    LoginSerializer, PasswordChangeSerializer, PasswordResetSerializer,
    PasswordResetConfirmSerializer, RoleSerializer
)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom JWT token view with additional user data.
    """
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # Log login attempt
        self._log_login_attempt(request, user.email, True)
        
        # Create or update user session
        self._create_user_session(request, user)
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })

    def _log_login_attempt(self, request, email, success):
        """Log login attempt for security monitoring."""
        LoginAttempt.objects.create(
            email=email,
            ip_address=self._get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', ''),
            success=success
        )

    def _get_client_ip(self, request):
        """Get client IP address."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def _create_user_session(self, request, user):
        """Create or update user session."""
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        
        UserSession.objects.update_or_create(
            session_key=session_key,
            defaults={
                'user': user,
                'ip_address': self._get_client_ip(request),
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'last_activity': timezone.now(),
                'is_active': True
            }
        )


class CustomTokenRefreshView(TokenRefreshView):
    """
    Custom token refresh view.
    """
    pass


class UserRegistrationView(APIView):
    """
    User registration endpoint.
    """
    permission_classes = [permissions.AllowAny]

    @transaction.atomic
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Send verification email
            self._send_verification_email(user)
            
            return Response({
                'message': 'User created successfully. Please check your email for verification.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _send_verification_email(self, user):
        """Send email verification."""
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        verification_url = f"{settings.FRONTEND_URL}/verify-email/{uid}/{token}/"
        
        subject = 'Verify your BlockBustre account'
        message = f"""
        Hi {user.first_name},
        
        Please click the link below to verify your email address:
        {verification_url}
        
        If you didn't create this account, please ignore this email.
        
        Best regards,
        The BlockBustre Team
        """
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )


class EmailVerificationView(APIView):
    """
    Email verification endpoint.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {'error': 'Invalid verification link.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if default_token_generator.check_token(user, token):
            user.is_verified = True
            user.save()
            return Response({'message': 'Email verified successfully.'})
        else:
            return Response(
                {'error': 'Invalid verification token.'},
                status=status.HTTP_400_BAD_REQUEST
            )


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    User profile view - get and update current user profile.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserUpdateView(generics.UpdateAPIView):
    """
    Update user information.
    """
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class PasswordChangeView(APIView):
    """
    Change user password.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Password changed successfully.'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    """
    Request password reset.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            
            # Generate reset token
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"
            
            subject = 'Reset your BlockBustre password'
            message = f"""
            Hi {user.first_name},
            
            You requested a password reset. Click the link below to reset your password:
            {reset_url}
            
            This link will expire in 24 hours.
            
            If you didn't request this, please ignore this email.
            
            Best regards,
            The BlockBustre Team
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            return Response({
                'message': 'Password reset email sent successfully.'
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    """
    Confirm password reset.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {'error': 'Invalid reset link.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {'error': 'Invalid reset token.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Password reset successfully.'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """
    Logout user and blacklist refresh token.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            # Deactivate user session
            session_key = request.session.session_key
            if session_key:
                UserSession.objects.filter(session_key=session_key).update(is_active=False)
            
            return Response({'message': 'Logout successful.'})
        except Exception as e:
            return Response(
                {'error': 'Invalid token.'},
                status=status.HTTP_400_BAD_REQUEST
            )


class RoleListView(generics.ListAPIView):
    """
    List all roles (admin only).
    """
    queryset = Role.objects.filter(is_active=True)
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_dashboard(request):
    """
    User dashboard data.
    """
    user = request.user
    
    try:
        # Get user statistics safely
        stats = {
            'total_contracts': 0,  # Will be implemented when contracts app is ready
            'total_transactions': 0,  # Will be implemented when transactions app is ready
            'kyc_verified': user.is_kyc_verified,
            'subscription_active': user.is_subscriber(),
            'service_fee_percentage': user.get_service_fee_percentage(),
        }
        
        return Response({
            'user': UserSerializer(user).data,
            'stats': stats
        })
    except Exception as e:
        return Response(
            {'error': f'Dashboard data error: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def kyc_verification_request(request):
    """
    Request KYC verification.
    """
    user = request.user
    
    # This would integrate with a KYC service like Jumio, Onfido, etc.
    # For now, we'll just mark it as requested
    
    return Response({
        'message': 'KYC verification requested. You will be contacted for document submission.',
        'status': 'pending'
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_admin_status(request):
    """
    Check if current user is admin.
    """
    user = request.user
    return Response({
        'is_superuser': user.is_superuser,
        'is_staff': user.is_staff,
        'is_admin': user.is_superuser or user.is_staff,
        'email': user.email
    })

