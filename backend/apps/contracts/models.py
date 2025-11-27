"""
Smart contract models for blockchain registration.
"""
from django.db import models
from django.core.validators import FileExtensionValidator
from apps.core.models import TimestampedModel, SoftDeleteModel
from apps.accounts.models import User


class ContractCategory(models.Model):
    """
    Categories for different types of contracts.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Contract Categories"
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name


class SmartContract(TimestampedModel, SoftDeleteModel):
    """
    Smart contract model for blockchain registration.
    """
    CONTRACT_STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('deployed', 'Deployed'),
        ('verified', 'Verified'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]

    BLOCKCHAIN_NETWORK_CHOICES = [
        ('ethereum_mainnet', 'Ethereum Mainnet'),
        ('ethereum_sepolia', 'Ethereum Sepolia'),
        ('polygon_mainnet', 'Polygon Mainnet'),
        ('polygon_mumbai', 'Polygon Mumbai'),
        ('bsc_mainnet', 'BSC Mainnet'),
        ('bsc_testnet', 'BSC Testnet'),
    ]

    # Basic information
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(
        ContractCategory,
        on_delete=models.PROTECT,
        related_name='contracts'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='contracts'
    )

    # Document information
    document_file = models.FileField(
        upload_to='contracts/documents/',
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx', 'txt'])],
        null=True,
        blank=True
    )
    document_hash = models.CharField(max_length=64, blank=True)
    document_metadata = models.JSONField(default=dict, blank=True)

    # Blockchain information
    blockchain_network = models.CharField(
        max_length=20,
        choices=BLOCKCHAIN_NETWORK_CHOICES,
        default='ethereum_sepolia'
    )
    contract_address = models.CharField(max_length=42, blank=True)
    transaction_hash = models.CharField(max_length=66, blank=True)
    block_number = models.PositiveIntegerField(null=True, blank=True)
    gas_used = models.PositiveIntegerField(null=True, blank=True)
    gas_price = models.PositiveIntegerField(null=True, blank=True)

    # Status and pricing
    status = models.CharField(
        max_length=20,
        choices=CONTRACT_STATUS_CHOICES,
        default='draft'
    )
    gas_fee_estimate = models.DecimalField(max_digits=18, decimal_places=8, null=True, blank=True)
    service_fee = models.DecimalField(max_digits=18, decimal_places=8, null=True, blank=True)
    total_cost = models.DecimalField(max_digits=18, decimal_places=8, null=True, blank=True)

    # Verification and metadata
    verification_status = models.BooleanField(default=False)
    verification_timestamp = models.DateTimeField(null=True, blank=True)
    contract_metadata = models.JSONField(default=dict, blank=True)

    # Error handling
    error_message = models.TextField(blank=True)
    retry_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.user.email}"

    @property
    def is_deployed(self):
        return self.status == 'deployed' and bool(self.contract_address)

    @property
    def is_verified(self):
        return self.verification_status and bool(self.verification_timestamp)

    def calculate_total_cost(self):
        """
        Calculate total cost including gas fees and service charges.
        """
        if self.gas_fee_estimate:
            service_fee_percentage = self.user.get_service_fee_percentage()
            service_fee = self.gas_fee_estimate * (service_fee_percentage / 100)
            self.service_fee = service_fee
            self.total_cost = self.gas_fee_estimate + service_fee
            self.save(update_fields=['service_fee', 'total_cost'])


class ContractTemplate(models.Model):
    """
    Pre-built contract templates for different document types.
    """
    name = models.CharField(max_length=200)
    category = models.ForeignKey(
        ContractCategory,
        on_delete=models.CASCADE,
        related_name='templates'
    )
    description = models.TextField()
    template_code = models.TextField()
    variables = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class ContractDeploymentLog(TimestampedModel):
    """
    Log deployment attempts and results.
    """
    contract = models.ForeignKey(
        SmartContract,
        on_delete=models.CASCADE,
        related_name='deployment_logs'
    )
    deployment_attempt = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20)
    message = models.TextField()
    transaction_hash = models.CharField(max_length=66, blank=True)
    gas_used = models.PositiveIntegerField(null=True, blank=True)
    error_details = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.contract.title} - Attempt {self.deployment_attempt}"

