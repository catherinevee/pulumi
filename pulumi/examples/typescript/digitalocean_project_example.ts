// Pulumi DigitalOcean Project Example (TypeScript)
import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const project = new digitalocean.Project("example-project", {
    name: "Example Project",
    purpose: "Web Application",
    environment: "Development",
    description: "Project for IAM example"
});

export const projectId = project.id;
