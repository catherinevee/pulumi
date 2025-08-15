// Pulumi DigitalOcean Spaces Example (TypeScript)
import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const space = new digitalocean.SpacesBucket("example-space", {
    region: "nyc3"
});

export const bucketName = space.name;
