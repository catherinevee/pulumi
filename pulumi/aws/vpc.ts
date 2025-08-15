
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Interfaces for type safety
interface VpcArgs {
    cidrBlock: string;
    enableDnsSupport?: boolean;
    enableDnsHostnames?: boolean;
    tags?: { [key: string]: string };
}

interface SubnetArgs {
    vpcId: pulumi.Input<string>;
    cidrBlock: string;
    availabilityZone: string;
    mapPublicIpOnLaunch?: boolean;
    tags?: { [key: string]: string };
}

interface RouteTableArgs {
    vpcId: pulumi.Input<string>;
    routes: aws.types.input.ec2.RouteTableRoute[];
    tags?: { [key: string]: string };
}

// Define the VPC
const vpcArgs: VpcArgs = {
    cidrBlock: "10.0.0.0/16",
    enableDnsSupport: true,
    enableDnsHostnames: true,
    tags: { Name: "myVpc" },
};
const vpc = new aws.ec2.Vpc("myVpc", vpcArgs);

// Define subnets
const publicSubnetArgs: SubnetArgs = {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    availabilityZone: "us-west-2a",
    mapPublicIpOnLaunch: true,
    tags: { Name: "publicSubnet" },
};
const publicSubnet = new aws.ec2.Subnet("publicSubnet", publicSubnetArgs);

const privateSubnetArgs: SubnetArgs = {
    vpcId: vpc.id,
    cidrBlock: "10.0.2.0/24",
    availabilityZone: "us-west-2a",
    tags: { Name: "privateSubnet" },
};
const privateSubnet = new aws.ec2.Subnet("privateSubnet", privateSubnetArgs);

// Define an Internet Gateway
const internetGateway = new aws.ec2.InternetGateway("myInternetGateway", {
    vpcId: vpc.id,
    tags: { Name: "myInternetGateway" },
});

// Define a Route Table
const routeTableArgs: RouteTableArgs = {
    vpcId: vpc.id,
    routes: [{
        cidrBlock: "0.0.0.0/0",
        gatewayId: internetGateway.id,
    }],
    tags: { Name: "myRouteTable" },
};
const routeTable = new aws.ec2.RouteTable("myRouteTable", routeTableArgs);

// Associate the Route Table with the Public Subnet
const routeTableAssociation = new aws.ec2.RouteTableAssociation("publicSubnetAssociation", {
    subnetId: publicSubnet.id,
    routeTableId: routeTable.id,
});

// Export the VPC ID and Subnet IDs
export const vpcId = vpc.id;
export const publicSubnetId = publicSubnet.id;
export const privateSubnetId = privateSubnet.id;