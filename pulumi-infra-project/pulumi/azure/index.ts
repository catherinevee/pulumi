import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import { Network } from "./network";
import { AKS } from "./aks";

// Initialize the Azure provider
const config = new pulumi.Config("azure");
const resourceGroupName = config.require("resourceGroupName");

// Create a new resource group
const resourceGroup = new azure.core.ResourceGroup("myResourceGroup", {
    name: resourceGroupName,
});

// Initialize the network module
const network = new Network(resourceGroup.name);

// Initialize the AKS module
const aks = new AKS(resourceGroup.name, network.vnetName, network.subnetName);

// Export the AKS cluster name and kubeconfig
export const aksClusterName = aks.clusterName;
export const kubeconfig = aks.kubeconfig;