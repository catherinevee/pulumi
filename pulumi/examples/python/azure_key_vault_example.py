"""
Pulumi Azure Key Vault Example (Python)

Setup:
  pip install pulumi pulumi_azure_native
Usage:
  pulumi up
"""
import pulumi
import pulumi_azure_native as azure

resource_group = azure.resources.ResourceGroup('example-rg')
vault = azure.keyvault.Vault('example-vault',
    resource_group_name=resource_group.name,
    properties=azure.keyvault.VaultPropertiesArgs(
        tenant_id='00000000-0000-0000-0000-000000000000',  # Replace with your tenant ID
        sku=azure.keyvault.SkuArgs(name='standard', family='A'),
        access_policies=[],
        enabled_for_deployment=True,
        enabled_for_disk_encryption=True,
        enabled_for_template_deployment=True
    )
)
pulumi.export('key_vault_name', vault.name)
