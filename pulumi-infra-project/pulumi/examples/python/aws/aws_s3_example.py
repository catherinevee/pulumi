"""
Pulumi AWS S3 Bucket Example (Python)

Setup:
  pip install pulumi pulumi_aws
Usage:
  pulumi up
"""
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket('my-example-bucket')
pulumi.export('bucket_name', bucket.id)
