// Pulumi DigitalOcean Firewall Example (TypeScript)
import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const firewall = new digitalocean.Firewall("example-firewall", {
    dropletIds: [],
    inboundRules: [{
        protocol: "tcp",
        portRange: "22",
        sourceAddresses: ["0.0.0.0/0"]
    }],
    outboundRules: [{
        protocol: "tcp",
        portRange: "all",
        destinationAddresses: ["0.0.0.0/0"]
    }]
});

export const firewallId = firewall.id;
