
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";


/**
 * VPC component for AWS with configurable CIDR, subnets, tags, and security group rules.
 * Example usage:
 *   const vpc = new VPC("my-vpc", { cidrBlock: "10.1.0.0/16", allowedCidr: "203.0.113.0/24", tags: { Project: "Demo" } });
 */
interface VpcArgs {
	cidrBlock: string;
	enableDnsSupport?: boolean;
	enableDnsHostnames?: boolean;
	tags?: { [key: string]: string };
}

/**
 * VPC component for AWS with configurable CIDR, subnets, tags, and security group rules.
 * Example usage:
 *   const vpc = new VPC("my-vpc", { cidrBlock: "10.1.0.0/16", allowedCidr: "203.0.113.0/24", tags: { Project: "Demo" } });
 */
export class VPC {
	public id: pulumi.Output<string>;
	public subnetIds: pulumi.Output<string>[];
	public securityGroupIds: pulumi.Output<string>[];
	constructor(name: string, args?: { cidrBlock?: string; allowedCidr?: string; tags?: { [key: string]: string } }) {
		const vpcArgs: VpcArgs = {
			cidrBlock: args?.cidrBlock || "10.0.0.0/16",
			enableDnsSupport: true,
			enableDnsHostnames: true,
			tags: { Name: name, ...(args?.tags || {}) },
		};
		const vpc = new aws.ec2.Vpc(name, vpcArgs);
		const publicSubnet = new aws.ec2.Subnet(`${name}-publicSubnet`, {
			vpcId: vpc.id,
			cidrBlock: "10.0.1.0/24",
			availabilityZone: "us-west-2a",
			mapPublicIpOnLaunch: true,
			tags: { Name: `${name}-publicSubnet` },
		});
		const privateSubnet = new aws.ec2.Subnet(`${name}-privateSubnet`, {
			vpcId: vpc.id,
			cidrBlock: "10.0.2.0/24",
			availabilityZone: "us-west-2a",
			tags: { Name: `${name}-privateSubnet` },
		});
		const internetGateway = new aws.ec2.InternetGateway(`${name}-igw`, {
			vpcId: vpc.id,
			tags: { Name: `${name}-igw` },
		});
		const routeTable = new aws.ec2.RouteTable(`${name}-rt`, {
			vpcId: vpc.id,
			routes: [{
				cidrBlock: "0.0.0.0/0",
				gatewayId: internetGateway.id,
			}],
			tags: { Name: `${name}-rt` },
		});
		new aws.ec2.RouteTableAssociation(`${name}-publicAssoc`, {
			subnetId: publicSubnet.id,
			routeTableId: routeTable.id,
		});
		const allowedCidr = args?.allowedCidr || "203.0.113.0/24";
		const securityGroup = new aws.ec2.SecurityGroup(`${name}-sg`, {
			vpcId: vpc.id,
			description: "Least privilege security group",
			ingress: [
				{ protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: [allowedCidr] },
				{ protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: [allowedCidr] },
			],
			egress: [{ protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] }],
			tags: { Name: `${name}-sg` },
		});
		this.id = vpc.id;
		this.subnetIds = [publicSubnet.id, privateSubnet.id];
		this.securityGroupIds = [securityGroup.id];
	}
}
