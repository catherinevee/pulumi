// Pulumi DigitalOcean Droplet Example (TypeScript)
import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const droplet = new digitalocean.Droplet("example-droplet", {
    image: "ubuntu-22-04-x64",
    region: "nyc3",
    size: "s-1vcpu-1gb"
});

export const dropletId = droplet.id;
export const dropletIp = droplet.ipv4Address;
