import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { StackReference } from "@pulumi/pulumi";

// Import the network stack
const networkStack = new StackReference("organization/network-prod/main");

// Retrieve outputs from the network stack
const vpcId = networkStack.getOutput("vpcId");
const privateSubnetIds = networkStack.getOutput("privateSubnetIds");

// Test suite for the network stack
describe("Network Stack", () => {
    test("VPC should be created", async () => {
        const vpc = await aws.ec2.getVpc({ id: vpcId });
        expect(vpc).toBeDefined();
        expect(vpc.cidrBlock).toEqual("10.0.0.0/16"); // Example CIDR block
    });

    test("Private subnets should be created", async () => {
        const subnets = await Promise.all(privateSubnetIds.map(id => aws.ec2.getSubnet({ id })));
        expect(subnets.length).toBeGreaterThan(0);
        subnets.forEach(subnet => {
            expect(subnet.mapPublicIpOnLaunch).toBe(false);
        });
    });
});