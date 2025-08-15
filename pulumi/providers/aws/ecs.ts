import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

/**
 * ECS cluster component for AWS with configurable image, environment, secrets, and tags.
 * Example usage:
 *   const ecs = new ECS("my-ecs-cluster", vpc, { image: "nginx:latest", env: { NODE_ENV: "production" }, secrets: { DB_PASSWORD: pulumi.secret("password") }, tags: { Project: "Demo" } });
 */
export class ECS {
	public clusterName: pulumi.Output<string>;
	constructor(name: string, vpc: { subnetIds: pulumi.Input<string>[]; securityGroupIds: pulumi.Input<string>[] }, args?: { image?: string; env?: { [key: string]: string }; secrets?: { [key: string]: pulumi.Input<string> }; tags?: { [key: string]: string } }) {
		const cluster = new aws.ecs.Cluster(name, {
			capacityProviders: ["FARGATE"],
			tags: args?.tags,
		});
		const containerDef: any = {
			name: "app-container",
			image: args?.image || "nginx:latest",
			essential: true,
			portMappings: [{ containerPort: 80, hostPort: 80, protocol: "tcp" }],
			environment: args?.env ? Object.entries(args.env).map(([name, value]) => ({ name, value })) : undefined,
			secrets: args?.secrets ? Object.entries(args.secrets).map(([name, value]) => ({ name, valueFrom: pulumi.secret(value) })) : undefined,
		};
		const taskDefinition = new aws.ecs.TaskDefinition(`${name}-task`, {
			family: `${name}-family`,
			networkMode: "awsvpc",
			requiresCompatibilities: ["FARGATE"],
			cpu: "256",
			memory: "512",
			containerDefinitions: JSON.stringify([containerDef]),
			tags: args?.tags,
		});
		new aws.ecs.Service(`${name}-service`, {
			cluster: cluster.id,
			taskDefinition: taskDefinition.arn,
			desiredCount: 1,
			launchType: "FARGATE",
			networkConfiguration: {
				assignPublicIp: true,
				subnets: vpc.subnetIds,
				securityGroups: vpc.securityGroupIds,
			},
			tags: args?.tags,
		});
		this.clusterName = cluster.name;
	}
}
