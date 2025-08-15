import * as pulumi from "@pulumi/pulumi";
import { GKE } from "./compute/gke";
import { Network } from "./networking/network";

const network = new Network("my-network");
const gke = new GKE("my-gke-cluster", { networkId: network.networkId });

export const networkId = network.networkId;
export const clusterName = gke.clusterName;
