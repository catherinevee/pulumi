import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const config = new pulumi.Config("azure");
const resourceGroupName = config.require("resourceGroupName");
const location = config.require("location");
const clusterName = config.require("clusterName");

// Create the Azure Kubernetes Service (AKS) cluster
const aksCluster = new azure.containerservice.ManagedCluster(clusterName, {
    resourceGroupName: resourceGroupName,
    location: location,
    agentPoolProfiles: [{
        name: "agentpool",
        count: 3,
        vmSize: "Standard_DS2_v2",
        mode: "System",
    }],
    dnsPrefix: clusterName,
    enableRBAC: true,
    kubernetesVersion: "1.21.2",
    identity: {
        type: "SystemAssigned",
    },
});

// Export the AKS cluster's kubeconfig
export const kubeConfig = pulumi.output(aksCluster.kubeConfigs).apply(kubeConfigs => kubeConfigs[0].value);