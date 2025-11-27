"""
Management command to create default roles.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Permission
from apps.accounts.models import Role


class Command(BaseCommand):
    help = 'Create default roles for RBAC system'

    def handle(self, *args, **options):
        # Define default roles and their permissions
        roles_data = [
            {
                'name': 'Admin',
                'description': 'Full system access',
                'permissions': [
                    'add_user', 'change_user', 'delete_user', 'view_user',
                    'add_role', 'change_role', 'delete_role', 'view_role',
                    'add_smartcontract', 'change_smartcontract', 'delete_smartcontract', 'view_smartcontract',
                    'add_transaction', 'change_transaction', 'delete_transaction', 'view_transaction',
                ]
            },
            {
                'name': 'Manager',
                'description': 'Management access with limited admin capabilities',
                'permissions': [
                    'view_user', 'change_user',
                    'view_smartcontract', 'change_smartcontract',
                    'view_transaction', 'change_transaction',
                ]
            },
            {
                'name': 'User',
                'description': 'Standard user access',
                'permissions': [
                    'view_smartcontract', 'add_smartcontract',
                    'view_transaction', 'add_transaction',
                ]
            },
            {
                'name': 'Guest',
                'description': 'Limited guest access',
                'permissions': [
                    'view_smartcontract',
                ]
            }
        ]

        for role_data in roles_data:
            role, created = Role.objects.get_or_create(
                name=role_data['name'],
                defaults={
                    'description': role_data['description'],
                    'is_active': True
                }
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created role: {role.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Role already exists: {role.name}')
                )

            # Add permissions to role
            role.permissions.clear()
            for perm_codename in role_data['permissions']:
                try:
                    permission = Permission.objects.get(codename=perm_codename)
                    role.permissions.add(permission)
                except Permission.DoesNotExist:
                    self.stdout.write(
                        self.style.ERROR(f'Permission not found: {perm_codename}')
                    )

            self.stdout.write(
                self.style.SUCCESS(f'Added {role.permissions.count()} permissions to {role.name}')
            )

        self.stdout.write(
            self.style.SUCCESS('Successfully created default roles!')
        )

