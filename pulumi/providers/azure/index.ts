import * as pulumi from "@pulumi/pulumi";
import { AKS } from "./compute/aks";
import { Network } from "./networking/network";

const network = new Network("my-network");
const aks = new AKS("my-aks-cluster", { subnetId: network.subnetId });

export const networkId = network.id;
export const kubeconfig = aks.kubeconfig;
