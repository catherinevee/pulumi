"""
Pulumi AWS VPC Example (Python)

Setup:
  pip install pulumi pulumi_aws
Usage:
  pulumi up
"""
import pulumi
import pulumi_aws as aws

vpc = aws.ec2.Vpc('example-vpc',
    cidr_block='10.0.0.0/16',
    enable_dns_support=True,
    enable_dns_hostnames=True
)
pulumi.export('vpc_id', vpc.id)
