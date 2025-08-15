import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { VPC } from "./vpc";
import { ECS } from "./ecs";
import { S3 } from "./s3";

// Initialize the VPC
const vpc = new VPC("my-vpc");

// Initialize the ECS cluster
const ecs = new ECS("my-ecs-cluster", vpc);

// Initialize the S3 bucket
const s3 = new S3("my-s3-bucket");

// Export the outputs
export const vpcId = vpc.id;
export const ecsClusterName = ecs.clusterName;
export const s3BucketName = s3.bucketName;