import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

// Define the Azure virtual network
const vnet = new azure.network.VirtualNetwork("myVnet", {
    addressSpaces: ["10.0.0.0/16"],
    location: "West US",
    resourceGroupName: "myResourceGroup",
    subnets: [{
        name: "mySubnet",
        addressPrefix: "10.0.1.0/24",
    }],
});

// Define a network security group
const nsg = new azure.network.NetworkSecurityGroup("myNsg", {
    location: vnet.location,
    resourceGroupName: "myResourceGroup",
    securityRules: [{
        name: "allow-ssh",
        priority: 1000,
        direction: "Inbound",
        access: "Allow",
        protocol: "Tcp",
        sourcePortRange: "*",
        destinationPortRange: "22",
        sourceAddressPrefix: "*",
        destinationAddressPrefix: "*",
    }],
});

// Associate the network security group with the subnet
const subnet = new azure.network.Subnet("mySubnet", {
    resourceGroupName: "myResourceGroup",
    virtualNetworkName: vnet.name,
    addressPrefix: "10.0.1.0/24",
    networkSecurityGroupId: nsg.id,
});

// Export the virtual network and subnet IDs
export const vnetId = vnet.id;
export const subnetId = subnet.id;