"""
Pulumi GCP KMS KeyRing Example (Python)

Setup:
  pip install pulumi pulumi_gcp
Usage:
  pulumi up
"""
import pulumi
import pulumi_gcp as gcp

keyring = gcp.kms.KeyRing('example-keyring',
    location='global'
)
pulumi.export('kms_keyring_name', keyring.name)
