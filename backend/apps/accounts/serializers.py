"""
Serializers for user authentication and management.
"""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User, UserProfile, Role


class RoleSerializer(serializers.ModelSerializer):
    """
    Serializer for Role model.
    """
    permissions_count = serializers.SerializerMethodField()

    class Meta:
        model = Role
        fields = [
            'id', 'name', 'description', 'permissions_count',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_permissions_count(self, obj):
        return obj.permissions.count()


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for UserProfile model.
    """
    class Meta:
        model = UserProfile
        fields = [
            'company_name', 'job_title', 'industry',
            'address_line_1', 'address_line_2', 'city',
            'state_province', 'postal_code', 'website',
            'linkedin_profile', 'twitter_handle', 'bio',
            'timezone', 'profile_public', 'show_email',
            'show_phone', 'profile_picture'
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )
    password_confirm = serializers.CharField(write_only=True)
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = [
            'email', 'first_name', 'last_name', 'password',
            'password_confirm', 'phone_number', 'date_of_birth',
            'country', 'language', 'profile'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match.")
        return attrs

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        validated_data.pop('password_confirm')
        
        # Create user
        user = User.objects.create_user(**validated_data)
        
        # Create profile
        UserProfile.objects.create(user=user, **profile_data)
        
        return user


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model.
    """
    profile = UserProfileSerializer(read_only=True)
    role = RoleSerializer(read_only=True)
    full_name = serializers.ReadOnlyField()
    is_subscriber = serializers.SerializerMethodField()
    service_fee_percentage = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'phone_number', 'date_of_birth', 'country', 'language',
            'is_kyc_verified', 'kyc_verified_at', 'wallet_address',
            'wallet_type', 'subscription_type', 'subscription_active',
            'subscription_start_date', 'subscription_end_date',
            'role', 'is_active', 'is_verified', 'is_staff', 'is_superuser',
            'email_notifications', 'sms_notifications', 'profile', 'is_subscriber',
            'service_fee_percentage', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'is_kyc_verified', 'kyc_verified_at',
            'subscription_start_date', 'subscription_end_date',
            'is_verified', 'created_at', 'updated_at'
        ]

    def get_is_subscriber(self, obj):
        return obj.is_subscriber()

    def get_service_fee_percentage(self, obj):
        return obj.get_service_fee_percentage()


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating user information.
    """
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'phone_number',
            'date_of_birth', 'country', 'language',
            'wallet_address', 'wallet_type',
            'email_notifications', 'sms_notifications',
            'profile'
        ]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        # Update user fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update profile
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        
        return instance


class PasswordChangeSerializer(serializers.Serializer):
    """
    Serializer for password change.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password]
    )
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("New passwords don't match.")
        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(
                request=self.context.get('request'),
                username=email,
                password=password
            )
            if not user:
                raise serializers.ValidationError(
                    'Invalid email or password.'
                )
            if not user.is_active:
                raise serializers.ValidationError(
                    'User account is disabled.'
                )
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError(
                'Must include "email" and "password".'
            )


class PasswordResetSerializer(serializers.Serializer):
    """
    Serializer for password reset request.
    """
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            User.objects.get(email=value, is_active=True)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializer for password reset confirmation.
    """
    new_password = serializers.CharField(
        validators=[validate_password]
    )
    new_password_confirm = serializers.CharField()

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("Passwords don't match.")
        return attrs

