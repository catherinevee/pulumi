"""
Pulumi AWS DynamoDB Table Example (Python)

Setup:
  pip install pulumi pulumi_aws
Usage:
  pulumi up
"""
import pulumi
import pulumi_aws as aws

table = aws.dynamodb.Table('example-table',
    attributes=[{'name': 'id', 'type': 'S'}],
    hash_key='id',
    billing_mode='PAY_PER_REQUEST'
)
pulumi.export('table_name', table.name)
