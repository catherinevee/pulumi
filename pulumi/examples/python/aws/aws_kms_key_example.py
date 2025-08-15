"""
Pulumi AWS KMS Key Example (Python)

Setup:
  pip install pulumi pulumi_aws
Usage:
  pulumi up
"""
import pulumi
import pulumi_aws as aws

key = aws.kms.Key('example-key',
    description='Example KMS key for encryption',
    deletion_window_in_days=7
)
pulumi.export('kms_key_id', key.id)
