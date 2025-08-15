import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

export class Network {
	public networkId: pulumi.Output<string>;
	public subnetId: pulumi.Output<string>;
	constructor(name: string) {
		const network = new gcp.compute.Network(`${name}-network`, {
			autoCreateSubnetworks: false,
		});
		const subnet = new gcp.compute.Subnetwork(`${name}-subnet`, {
			ipCidrRange: "10.2.0.0/16",
			region: "us-central1",
			network: network.id,
		});
		this.networkId = network.id;
		this.subnetId = subnet.id;
	}
	/**
	 * GCP Network component for creating a VPC and Subnet with configurable CIDR, region, and tags.
	 * Example usage:
	 *   const network = new GCPNetwork("demo", { cidr: "10.1.1.0/24", region: "us-central1", tags: { Project: "Demo" } });
	 */
	export class GCPNetwork {
		public network: gcp.compute.Network;
		public subnetwork: gcp.compute.Subnetwork;
		constructor(name: string, args?: { cidr?: string; region?: string; tags?: { [key: string]: string } }) {
			this.network = new gcp.compute.Network(`${name}-network`, {
				autoCreateSubnetworks: false,
				labels: args?.tags,
			});
			this.subnetwork = new gcp.compute.Subnetwork(`${name}-subnet`, {
				network: this.network.id,
				ipCidrRange: args?.cidr || "10.0.1.0/24",
				region: args?.region || gcp.config.region,
				labels: args?.tags,
			});
		}
}
