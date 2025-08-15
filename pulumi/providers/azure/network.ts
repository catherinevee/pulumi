import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
/**
 * Azure Network component for creating a VNet and Subnet with configurable address spaces, prefixes, and tags.
 * Example usage:
 *   const network = new AzureNetwork("demo", { addressSpaces: ["10.1.0.0/16"], subnetPrefix: "10.1.1.0/24", tags: { Project: "Demo" } });
 */

export class AzureNetwork {
	public vnet: azure.network.VirtualNetwork;
	public subnet: azure.network.Subnet;
	constructor(name: string, args?: { addressSpaces?: string[]; subnetPrefix?: string; tags?: { [key: string]: string } }) {
		const resourceGroup = new azure.resources.ResourceGroup(`${name}-rg`, { tags: args?.tags });
		this.vnet = new azure.network.VirtualNetwork(`${name}-vnet`, {
			resourceGroupName: resourceGroup.name,
			addressSpace: { addressPrefixes: args?.addressSpaces || ["10.0.0.0/16"] },
			tags: args?.tags,
		});
		this.subnet = new azure.network.Subnet(`${name}-subnet`, {
			resourceGroupName: resourceGroup.name,
			virtualNetworkName: this.vnet.name,
			addressPrefix: args?.subnetPrefix || "10.0.1.0/24",
		});
	}
}
import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
