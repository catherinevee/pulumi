"""
Pulumi Azure Storage Account Example (Python)

Setup:
  pip install pulumi pulumi_azure_native
Usage:
  pulumi up
"""
import pulumi
import pulumi_azure_native as azure

resource_group = azure.resources.ResourceGroup('example-rg')
account = azure.storage.StorageAccount('examplestorage',
    resource_group_name=resource_group.name,
    sku=azure.storage.SkuArgs(name="Standard_LRS"),
    kind="StorageV2"
)
pulumi.export('storage_account_name', account.name)
