// Pulumi DigitalOcean Load Balancer Example (TypeScript)
import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const lb = new digitalocean.LoadBalancer("example-lb", {
    region: "nyc3",
    forwardingRules: [{
        entryProtocol: "http",
        entryPort: 80,
        targetProtocol: "http",
        targetPort: 80
    }]
});

export const loadBalancerId = lb.id;
