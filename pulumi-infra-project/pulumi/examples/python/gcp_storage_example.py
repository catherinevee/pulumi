"""
Pulumi GCP Storage Bucket Example (Python)

Setup:
  pip install pulumi pulumi_gcp
Usage:
  pulumi up
"""
import pulumi
import pulumi_gcp as gcp

bucket = gcp.storage.Bucket('my-example-bucket')
pulumi.export('bucket_name', bucket.name)
