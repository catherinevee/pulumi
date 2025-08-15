import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
/**
 * AKS cluster component for Azure with configurable node count, VM size, tags, and secrets.
 * Example usage:
 *   const aks = new AKS("my-aks", { subnetId: network.subnet.id }, { nodeCount: 2, vmSize: "Standard_DS2_v2", tags: { Project: "Demo" } });
 */
export class AKS {
	public kubeconfig: pulumi.Output<string>;
	constructor(
		name: string,
		network: { subnetId: pulumi.Input<string> },
		args?: { nodeCount?: number; vmSize?: string; tags?: { [key: string]: string } }
	) {
		const resourceGroup = new azure.resources.ResourceGroup(`${name}-rg`, { tags: args?.tags });
		const k8sCluster = new azure.containerservice.ManagedCluster(name, {
			resourceGroupName: resourceGroup.name,
			location: resourceGroup.location,
			dnsPrefix: `${name}-dns`,
			agentPoolProfiles: [{
				name: "systempool",
				count: args?.nodeCount || 1,
				vmSize: args?.vmSize || "Standard_DS2_v2",
				mode: "System"
			}],
			linuxProfile: {
				adminUsername: "aksuser",
				ssh: {
					publicKeys: [{
						keyData: pulumi.secret(process.env.AKS_SSH_PUBLIC_KEY || "")
					}]
				}
			},
			servicePrincipalProfile: {
				clientId: pulumi.secret(process.env.AZURE_CLIENT_ID || ""),
				secret: pulumi.secret(process.env.AZURE_CLIENT_SECRET || ""),
			},
			tags: args?.tags,
		});
		new azure.containerservice.AgentPool(`${name}-userpool`, {
			resourceGroupName: resourceGroup.name,
			resourceName: k8sCluster.name,
			agentPoolName: "userpool",
			count: args?.nodeCount || 2,
			vmSize: args?.vmSize || "Standard_DS2_v2",
			mode: "User",
			vnetSubnetID: network.subnetId,
			tags: args?.tags,
		});
		this.kubeconfig = pulumi.all([resourceGroup.name, k8sCluster.name]).apply(([rgName, clusterName]: [string, string]) =>
			azure.containerservice.listManagedClusterUserCredentials({
				resourceGroupName: rgName,
				resourceName: clusterName
			}).then((result: any) => Buffer.from(result.kubeconfigs[0].value, "base64").toString())
		);
	}
}
/**
 * AKS cluster component for Azure with configurable node count, VM size, tags, and secrets.
 * Example usage:
 *   const aks = new AKS("my-aks", { subnetId: network.subnet.id }, { nodeCount: 2, vmSize: "Standard_DS2_v2", tags: { Project: "Demo" } });
 */

export class AKS {
	public kubeconfig: pulumi.Output<string>;
	constructor(
		name: string,
		network: { subnetId: pulumi.Input<string> },
		args?: { nodeCount?: number; vmSize?: string; tags?: { [key: string]: string } }
	) {
		const resourceGroup = new azure.resources.ResourceGroup(`${name}-rg`, { tags: args?.tags });
		const k8sCluster = new azure.containerservice.ManagedCluster(name, {
			resourceGroupName: resourceGroup.name,
			location: resourceGroup.location,
			dnsPrefix: `${name}-dns`,
			agentPoolProfiles: [{
				name: "systempool",
				count: args?.nodeCount || 1,
				vmSize: args?.vmSize || "Standard_DS2_v2",
				mode: "System"
			}],
			linuxProfile: {
				adminUsername: "aksuser",
				ssh: {
					publicKeys: [{
						keyData: pulumi.secret(process.env.AKS_SSH_PUBLIC_KEY || "")
					}]
				}
			},
			servicePrincipalProfile: {
				clientId: pulumi.secret(process.env.AZURE_CLIENT_ID || ""),
				secret: pulumi.secret(process.env.AZURE_CLIENT_SECRET || ""),
			},
			tags: args?.tags,
		});
		new azure.containerservice.AgentPool(`${name}-userpool`, {
			resourceGroupName: resourceGroup.name,
			resourceName: k8sCluster.name,
			agentPoolName: "userpool",
			count: args?.nodeCount || 2,
			vmSize: args?.vmSize || "Standard_DS2_v2",
			mode: "User",
			vnetSubnetID: network.subnetId,
			tags: args?.tags,
		});
		this.kubeconfig = pulumi.all([resourceGroup.name, k8sCluster.name]).apply(([rgName, clusterName]) =>
			azure.containerservice.listManagedClusterUserCredentials({
				resourceGroupName: rgName,
				resourceName: clusterName
			}).then(result => Buffer.from(result.kubeconfigs[0].value, "base64").toString())
		);
	}
}
