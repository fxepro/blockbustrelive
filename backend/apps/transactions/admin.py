"""
Admin configuration for transactions app.
"""
from django.contrib import admin
from .models import Transaction, PaymentMethod, Subscription


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'transaction_type', 'status', 'payment_method',
        'amount', 'currency', 'external_transaction_id', 'created_at'
    ]
    list_filter = [
        'transaction_type', 'status', 'payment_method', 'currency',
        'created_at', 'processed_at'
    ]
    search_fields = [
        'user__email', 'external_transaction_id', 'blockchain_transaction_hash',
        'payment_intent_id', 'description'
    ]
    readonly_fields = [
        'external_transaction_id', 'blockchain_transaction_hash',
        'payment_intent_id', 'processed_at', 'failed_at', 'created_at', 'updated_at'
    ]
    ordering = ['-created_at']


@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'payment_type', 'is_default', 'is_active',
        'card_last_four', 'card_brand', 'wallet_address_short', 'created_at'
    ]
    list_filter = ['payment_type', 'is_default', 'is_active', 'created_at']
    search_fields = ['user__email', 'wallet_address', 'stripe_payment_method_id']
    readonly_fields = ['created_at', 'updated_at']
    
    def wallet_address_short(self, obj):
        if obj.wallet_address:
            return f"{obj.wallet_address[:10]}...{obj.wallet_address[-6:]}"
        return "-"
    wallet_address_short.short_description = 'Wallet Address'


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'status', 'amount', 'currency', 'interval',
        'current_period_end', 'days_remaining', 'created_at'
    ]
    list_filter = ['status', 'interval', 'created_at', 'current_period_end']
    search_fields = ['user__email', 'stripe_subscription_id', 'price_id']
    readonly_fields = [
        'stripe_subscription_id', 'current_period_start', 'current_period_end',
        'cancelled_at', 'created_at', 'updated_at'
    ]
    ordering = ['-created_at']

