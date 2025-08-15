"""
Pulumi Azure AD User Example (Python)

Setup:
  pip install pulumi pulumi_azuread
Usage:
  pulumi up
"""
import pulumi
import pulumi_azuread as azuread

user = azuread.User('example-user',
    user_principal_name='example.user@yourdomain.com',
    display_name='Example User',
    password='Password123!'
)
pulumi.export('ad_user_id', user.id)
