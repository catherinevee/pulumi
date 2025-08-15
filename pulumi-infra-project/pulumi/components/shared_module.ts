import * as pulumi from "@pulumi/pulumi";

// Example of a shared module that exports reusable components
export class SharedModule {
    // Define a method to create a VPC
    static createVpc(name: string, cidrBlock: string) {
        const vpc = new aws.ec2.Vpc(name, {
            cidrBlock: cidrBlock,
            enableDnsSupport: true,
            enableDnsHostnames: true,
        });

        return vpc;
    }

    // Define a method to create an S3 bucket
    static createS3Bucket(name: string) {
        const bucket = new aws.s3.Bucket(name, {
            versioning: {
                enabled: true,
            },
            lifecycleRules: [{
                enabled: true,
                transitions: [{
                    days: 30,
                    storageClass: "STANDARD_IA",
                }],
                expiration: {
                    days: 365,
                },
            }],
        });

        return bucket;
    }

    // Define a method to create an ECS cluster
    static createEcsCluster(name: string) {
        const cluster = new aws.ecs.Cluster(name, {
            capacityProviders: ["FARGATE"],
        });

        return cluster;
    }
}