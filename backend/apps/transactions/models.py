"""
Transaction models for payment and blockchain operations.
"""
from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal
from apps.core.models import TimestampedModel
from apps.accounts.models import User
from apps.contracts.models import SmartContract


class Transaction(TimestampedModel):
    """
    Transaction model for payments and blockchain operations.
    """
    TRANSACTION_TYPE_CHOICES = [
        ('contract_deployment', 'Contract Deployment'),
        ('gas_payment', 'Gas Payment'),
        ('service_fee', 'Service Fee'),
        ('subscription', 'Subscription Payment'),
        ('refund', 'Refund'),
    ]

    TRANSACTION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe (Credit Card)'),
        ('ethereum', 'Ethereum'),
        ('usdc', 'USDC'),
        ('usdt', 'USDT'),
        ('bitcoin', 'Bitcoin'),
    ]

    # Basic information
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    contract = models.ForeignKey(
        SmartContract,
        on_delete=models.CASCADE,
        related_name='transactions',
        null=True,
        blank=True
    )

    # Transaction details
    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPE_CHOICES
    )
    status = models.CharField(
        max_length=20,
        choices=TRANSACTION_STATUS_CHOICES,
        default='pending'
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES
    )

    # Financial information
    amount = models.DecimalField(
        max_digits=18,
        decimal_places=8,
        validators=[MinValueValidator(Decimal('0.00'))]
    )
    currency = models.CharField(max_length=10, default='USD')
    exchange_rate = models.DecimalField(
        max_digits=18,
        decimal_places=8,
        null=True,
        blank=True
    )

    # External references
    external_transaction_id = models.CharField(max_length=200, blank=True)
    blockchain_transaction_hash = models.CharField(max_length=66, blank=True)
    payment_intent_id = models.CharField(max_length=200, blank=True)

    # Metadata and notes
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    error_message = models.TextField(blank=True)

    # Timestamps
    processed_at = models.DateTimeField(null=True, blank=True)
    failed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.transaction_type} - ${self.amount}"

    @property
    def is_completed(self):
        return self.status == 'completed'

    @property
    def is_failed(self):
        return self.status == 'failed'

    @property
    def is_pending(self):
        return self.status == 'pending'


class PaymentMethod(models.Model):
    """
    User payment methods for recurring payments.
    """
    PAYMENT_TYPE_CHOICES = [
        ('stripe_card', 'Stripe Credit Card'),
        ('crypto_wallet', 'Cryptocurrency Wallet'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='payment_methods'
    )
    payment_type = models.CharField(
        max_length=20,
        choices=PAYMENT_TYPE_CHOICES
    )
    is_default = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    # Stripe payment method details
    stripe_payment_method_id = models.CharField(max_length=200, blank=True)
    card_last_four = models.CharField(max_length=4, blank=True)
    card_brand = models.CharField(max_length=20, blank=True)
    card_exp_month = models.PositiveIntegerField(null=True, blank=True)
    card_exp_year = models.PositiveIntegerField(null=True, blank=True)

    # Crypto wallet details
    wallet_address = models.CharField(max_length=100, blank=True)
    wallet_type = models.CharField(max_length=20, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_default', '-created_at']

    def __str__(self):
        if self.payment_type == 'stripe_card':
            return f"{self.user.email} - {self.card_brand} ****{self.card_last_four}"
        else:
            return f"{self.user.email} - {self.wallet_type} {self.wallet_address[:10]}..."


class Subscription(models.Model):
    """
    User subscription management.
    """
    SUBSCRIPTION_STATUS_CHOICES = [
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
        ('past_due', 'Past Due'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='subscriptions'
    )
    stripe_subscription_id = models.CharField(max_length=200, unique=True)
    status = models.CharField(
        max_length=20,
        choices=SUBSCRIPTION_STATUS_CHOICES,
        default='active'
    )
    
    # Subscription details
    price_id = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    interval = models.CharField(max_length=20, default='month')
    
    # Dates
    current_period_start = models.DateTimeField()
    current_period_end = models.DateTimeField()
    cancel_at_period_end = models.BooleanField(default=False)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    
    # Payment method
    payment_method = models.ForeignKey(
        PaymentMethod,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - ${self.amount}/{self.interval} - {self.status}"

    @property
    def is_active(self):
        return self.status == 'active'

    @property
    def days_remaining(self):
        from django.utils import timezone
        if self.current_period_end:
            delta = self.current_period_end - timezone.now()
            return max(0, delta.days)
        return 0

