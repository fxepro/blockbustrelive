"""
Admin configuration for contracts app.
"""
from django.contrib import admin
from .models import SmartContract, ContractCategory, ContractTemplate, ContractDeploymentLog


@admin.register(ContractCategory)
class ContractCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'is_active', 'sort_order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['sort_order', 'name']


@admin.register(ContractTemplate)
class ContractTemplateAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_active', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['name']


class ContractDeploymentLogInline(admin.TabularInline):
    model = ContractDeploymentLog
    extra = 0
    readonly_fields = ['deployment_attempt', 'status', 'message', 'transaction_hash', 'gas_used', 'created_at']


@admin.register(SmartContract)
class SmartContractAdmin(admin.ModelAdmin):
    inlines = [ContractDeploymentLogInline]
    
    list_display = [
        'title', 'user', 'category', 'status', 'blockchain_network',
        'contract_address', 'total_cost', 'is_deployed', 'created_at'
    ]
    list_filter = [
        'status', 'category', 'blockchain_network', 'verification_status',
        'is_deleted', 'created_at'
    ]
    search_fields = ['title', 'description', 'user__email', 'contract_address', 'transaction_hash']
    readonly_fields = [
        'document_hash', 'contract_address', 'transaction_hash', 'block_number',
        'gas_used', 'gas_price', 'verification_timestamp', 'created_at', 'updated_at'
    ]
    ordering = ['-created_at']


@admin.register(ContractDeploymentLog)
class ContractDeploymentLogAdmin(admin.ModelAdmin):
    list_display = ['contract', 'deployment_attempt', 'status', 'transaction_hash', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['contract__title', 'transaction_hash', 'message']
    readonly_fields = ['contract', 'deployment_attempt', 'status', 'message', 'transaction_hash', 'gas_used', 'created_at']
    ordering = ['-created_at']

