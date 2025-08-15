import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

// Define the GCP network configuration
const network = new gcp.compute.Network("my-network", {
    autoCreateSubnetworks: false,
});

// Define the subnetwork configuration
const subnet = new gcp.compute.Subnetwork("my-subnetwork", {
    ipCidrRange: "10.0.0.0/24",
    region: "us-central1",
    network: network.name,
});

// Define firewall rules for the network
const firewall = new gcp.compute.Firewall("allow-ssh", {
    network: network.name,
    allows: [{
        protocol: "tcp",
        ports: ["22"],
    }],
    sourceRanges: ["0.0.0.0/0"],
});

// Export the network and subnet details
export const networkName = network.name;
export const subnetName = subnet.name;
export const subnetIpRange = subnet.ipCidrRange;