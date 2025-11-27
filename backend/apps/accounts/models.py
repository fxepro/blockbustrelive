"""
User models with RBAC (Role-Based Access Control) implementation.
"""
from django.contrib.auth.models import AbstractUser, Permission, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from apps.core.models import TimestampedModel


class UserManager(BaseUserManager):
    """
    Custom user manager for email-based authentication.
    """
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class Role(models.Model):
    """
    Role model for RBAC system.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(
        Permission,
        blank=True,
        help_text="Specific permissions for this role."
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def get_permissions(self):
        """
        Get all permissions for this role.
        """
        return self.permissions.all()


class User(AbstractUser, TimestampedModel):
    """
    Custom User model with RBAC support.
    """
    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    
    objects = UserManager()
    first_name = models.CharField(_('first name'), max_length=150)
    last_name = models.CharField(_('last name'), max_length=150)
    
    # User profile fields
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    phone_number = models.CharField(
        validators=[phone_regex],
        max_length=17,
        blank=True
    )
    date_of_birth = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=100, blank=True)
    language = models.CharField(max_length=10, default='en')
    
    # KYC and verification
    is_kyc_verified = models.BooleanField(default=False)
    kyc_verified_at = models.DateTimeField(null=True, blank=True)
    
    # Wallet information
    wallet_address = models.CharField(max_length=100, blank=True)
    wallet_type = models.CharField(
        max_length=20,
        choices=[
            ('ethereum', 'Ethereum'),
            ('polygon', 'Polygon'),
            ('bitcoin', 'Bitcoin'),
            ('other', 'Other'),
        ],
        default='ethereum'
    )
    
    # Subscription and billing
    subscription_type = models.CharField(
        max_length=20,
        choices=[
            ('pay_as_you_go', 'Pay As You Go'),
            ('subscription', 'Subscription'),
        ],
        default='pay_as_you_go'
    )
    subscription_active = models.BooleanField(default=False)
    subscription_start_date = models.DateTimeField(null=True, blank=True)
    subscription_end_date = models.DateTimeField(null=True, blank=True)
    
    # Role-based access control
    role = models.ForeignKey(
        'Role',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )
    
    # Account status
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    is_verified = models.BooleanField(
        _('verified'),
        default=False,
        help_text=_(
            'Designates whether this user has verified their email address.'
        ),
    )
    
    # Preferences
    email_notifications = models.BooleanField(default=True)
    sms_notifications = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_role_permissions(self):
        """
        Get all permissions for the user's role.
        """
        if self.role:
            return self.role.get_permissions()
        return Permission.objects.none()

    def has_role_permission(self, permission_codename):
        """
        Check if user has a specific permission through their role.
        """
        if self.role:
            return self.role.permissions.filter(codename=permission_codename).exists()
        return False

    def is_subscriber(self):
        """
        Check if user has active subscription.
        """
        from django.utils import timezone
        return (
            self.subscription_type == 'subscription' and
            self.subscription_active and
            self.subscription_end_date and
            self.subscription_end_date > timezone.now()
        )

    def get_service_fee_percentage(self):
        """
        Get service fee percentage based on subscription status.
        """
        if self.is_subscriber():
            return 10  # 10% for subscribers
        return 15  # 15% for pay-as-you-go


class UserProfile(models.Model):
    """
    Extended user profile information.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    
    # Professional information
    company_name = models.CharField(max_length=200, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    industry = models.CharField(max_length=100, blank=True)
    
    # Address information
    address_line_1 = models.CharField(max_length=255, blank=True)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state_province = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    
    # Social media and website
    website = models.URLField(blank=True)
    linkedin_profile = models.URLField(blank=True)
    twitter_handle = models.CharField(max_length=50, blank=True)
    
    # Profile picture
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        null=True,
        blank=True
    )
    
    # Bio and preferences
    bio = models.TextField(blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    
    # Privacy settings
    profile_public = models.BooleanField(default=False)
    show_email = models.BooleanField(default=False)
    show_phone = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')

    def __str__(self):
        return f"{self.user.full_name}'s Profile"


class UserSession(models.Model):
    """
    Track user sessions for security and analytics.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sessions'
    )
    session_key = models.CharField(max_length=40, unique=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-last_activity']

    def __str__(self):
        return f"{self.user.email} - {self.ip_address}"


class LoginAttempt(models.Model):
    """
    Track login attempts for security monitoring.
    """
    email = models.EmailField()
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    success = models.BooleanField(default=False)
    failure_reason = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email', 'created_at']),
            models.Index(fields=['ip_address', 'created_at']),
        ]

    def __str__(self):
        status = "Success" if self.success else "Failed"
        return f"{self.email} - {status} - {self.created_at}"

