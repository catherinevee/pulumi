import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an ECS cluster
const cluster = new aws.ecs.Cluster("my-cluster", {
    capacityProviders: ["FARGATE"],
});

// Define a task definition
const taskDefinition = new aws.ecs.TaskDefinition("my-task", {
    family: "my-task-family",
    networkMode: "awsvpc",
    requiresCompatibilities: ["FARGATE"],
    cpu: "256",
    memory: "512",
    containerDefinitions: JSON.stringify([{
        name: "my-container",
        image: "nginx:latest",
        essential: true,
        portMappings: [{
            containerPort: 80,
            hostPort: 80,
            protocol: "tcp",
        }],
    }]),
});

// Create a service to run the task
const service = new aws.ecs.Service("my-service", {
    cluster: cluster.id,
    taskDefinition: taskDefinition.arn,
    desiredCount: 1,
    launchType: "FARGATE",
    networkConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: ["subnet-12345678"], // Replace with your subnet IDs
        securityGroups: ["sg-12345678"], // Replace with your security group IDs
    },
});

// Export the cluster name and service name
export const clusterName = cluster.name;
export const serviceName = service.name;