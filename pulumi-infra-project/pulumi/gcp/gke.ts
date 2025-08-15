import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const config = new pulumi.Config();
const clusterName = config.require("clusterName");
const region = config.require("region");
const nodeCount = config.getNumber("nodeCount") || 3;
const nodeMachineType = config.get("nodeMachineType") || "e2-medium";

// Create a GKE cluster
const gkeCluster = new gcp.container.Cluster(clusterName, {
    location: region,
    initialNodeCount: nodeCount,
    nodeConfig: {
        machineType: nodeMachineType,
        oauthScopes: [
            "https://www.googleapis.com/auth/cloud-platform",
        ],
    },
});

// Export the cluster name and endpoint
export const clusterEndpoint = gkeCluster.endpoint;
export const clusterNameOutput = gkeCluster.name;