"""
Pulumi Azure Application Gateway Example (Python)

Setup:
  pip install pulumi pulumi_azure_native
Usage:
  pulumi up
"""
import pulumi
import pulumi_azure_native as azure

resource_group = azure.resources.ResourceGroup('example-rg')
gateway = azure.network.ApplicationGateway('example-gateway',
    resource_group_name=resource_group.name,
    sku=azure.network.ApplicationGatewaySkuArgs(
        name='Standard_v2',
        tier='Standard_v2',
        capacity=2
    ),
    gateway_ip_configurations=[azure.network.ApplicationGatewayIPConfigurationArgs(
        name='appGatewayIpConfig',
        subnet=azure.network.SubResourceArgs(id='/subscriptions/<sub-id>/resourceGroups/example-rg/providers/Microsoft.Network/virtualNetworks/example-vnet/subnets/default')
    )],
    frontend_ports=[azure.network.ApplicationGatewayFrontendPortArgs(name='frontendPort', port=80)],
    frontend_ip_configurations=[azure.network.ApplicationGatewayFrontendIPConfigurationArgs(
        name='frontendIpConfig',
        public_ip_address=azure.network.SubResourceArgs(id='/subscriptions/<sub-id>/resourceGroups/example-rg/providers/Microsoft.Network/publicIPAddresses/example-pip')
    )]
)
pulumi.export('app_gateway_name', gateway.name)
