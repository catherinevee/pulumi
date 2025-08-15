"""
Pulumi AWS IAM User Example (Python)

Setup:
  pip install pulumi pulumi_aws
Usage:
  pulumi up
"""
import pulumi
import pulumi_aws as aws

user = aws.iam.User('example-user')
pulumi.export('iam_user_name', user.name)
