import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Network } from "./network";
import { GKECluster } from "./gke";

// Initialize the GCP network
const gcpNetwork = new Network("gcp-network");

// Initialize the GKE cluster
const gkeCluster = new GKECluster("gke-cluster", {
    network: gcpNetwork.networkName,
    region: "us-central1",
});

// Export the cluster name and endpoint
export const clusterName = gkeCluster.clusterName;
export const clusterEndpoint = gkeCluster.endpoint;