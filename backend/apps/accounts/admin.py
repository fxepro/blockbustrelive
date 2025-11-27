"""
Admin configuration for accounts app.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import User, UserProfile, Role, UserSession, LoginAttempt


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'is_active', 'permissions_count', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    filter_horizontal = ['permissions']
    
    def permissions_count(self, obj):
        return obj.permissions.count()
    permissions_count.short_description = 'Permissions Count'


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fields = [
        'company_name', 'job_title', 'industry',
        'address_line_1', 'address_line_2', 'city',
        'state_province', 'postal_code', 'website',
        'linkedin_profile', 'twitter_handle', 'bio',
        'timezone', 'profile_public', 'show_email',
        'show_phone', 'profile_picture'
    ]


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = [UserProfileInline]
    
    list_display = [
        'email', 'full_name', 'role', 'is_kyc_verified',
        'subscription_type', 'subscription_active', 'is_verified',
        'is_active', 'created_at'
    ]
    list_filter = [
        'role', 'is_kyc_verified', 'subscription_type',
        'subscription_active', 'is_verified', 'is_active',
        'created_at', 'country'
    ]
    search_fields = ['email', 'first_name', 'last_name', 'phone_number']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'phone_number', 'date_of_birth', 'country', 'language')
        }),
        ('Permissions', {
            'fields': ('role', 'is_active', 'is_verified', 'is_kyc_verified', 'groups', 'user_permissions')
        }),
        ('Wallet & Blockchain', {
            'fields': ('wallet_address', 'wallet_type')
        }),
        ('Subscription', {
            'fields': ('subscription_type', 'subscription_active', 'subscription_start_date', 'subscription_end_date')
        }),
        ('Preferences', {
            'fields': ('email_notifications', 'sms_notifications')
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'date_joined', 'last_login']
    
    def full_name(self, obj):
        return obj.full_name
    full_name.short_description = 'Full Name'


@admin.register(UserSession)
class UserSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'ip_address', 'user_agent_short', 'created_at', 'last_activity', 'is_active']
    list_filter = ['is_active', 'created_at', 'last_activity']
    search_fields = ['user__email', 'ip_address']
    readonly_fields = ['session_key', 'user', 'ip_address', 'user_agent', 'created_at', 'last_activity']
    
    def user_agent_short(self, obj):
        return obj.user_agent[:50] + '...' if len(obj.user_agent) > 50 else obj.user_agent
    user_agent_short.short_description = 'User Agent'


@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    list_display = ['email', 'ip_address', 'success', 'failure_reason', 'created_at']
    list_filter = ['success', 'created_at']
    search_fields = ['email', 'ip_address']
    readonly_fields = ['email', 'ip_address', 'user_agent', 'success', 'failure_reason', 'created_at']

