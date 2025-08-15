import * as pulumi from "@pulumi/pulumi";
import { VPC } from "./networking/vpc";
import { ECS } from "./compute/ecs";
import { S3 } from "./security/s3";

const vpc = new VPC("my-vpc");
const ecs = new ECS("my-ecs-cluster", { subnetIds: vpc.subnetIds, securityGroupIds: vpc.securityGroupIds });
const s3 = new S3("my-s3-bucket");

export const vpcId = vpc.id;
export const ecsClusterName = ecs.clusterName;
export const s3BucketName = s3.bucketName;
