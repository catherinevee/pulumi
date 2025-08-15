import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

/**
 * GKE cluster component for GCP with configurable node count, machine type, and tags.
 * Example usage:
 *   const gke = new GKE("my-gke", { networkId: network.network.id }, { nodeCount: 2, machineType: "e2-standard-2", tags: { Project: "Demo" } });
 */
export class GKE {
	public clusterName: pulumi.Output<string>;
	public clusterEndpoint: pulumi.Output<string>;
	constructor(name: string, network: { networkId: pulumi.Input<string> }, args?: { nodeCount?: number; machineType?: string; tags?: { [key: string]: string } }) {
		const cluster = new gcp.container.Cluster(name, {
			initialNodeCount: args?.nodeCount || 2,
			minMasterVersion: "latest",
			network: network.networkId,
			nodeConfig: {
				machineType: args?.machineType || "e2-medium",
				oauthScopes: [
					"https://www.googleapis.com/auth/cloud-platform",
				],
				labels: args?.tags,
			},
			resourceLabels: args?.tags,
		});
		this.clusterName = cluster.name;
		this.clusterEndpoint = cluster.endpoint;
	}
}
