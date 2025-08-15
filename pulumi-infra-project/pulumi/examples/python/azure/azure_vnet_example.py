"""
Pulumi Azure Virtual Network Example (Python)

Setup:
  pip install pulumi pulumi_azure_native
Usage:
  pulumi up
"""
import pulumi
import pulumi_azure_native as azure

resource_group = azure.resources.ResourceGroup('example-rg')
vnet = azure.network.VirtualNetwork('example-vnet',
    resource_group_name=resource_group.name,
    address_space=azure.network.AddressSpaceArgs(
        address_prefixes=["10.0.0.0/16"]
    )
)
pulumi.export('vnet_name', vnet.name)
