"""
Pulumi GCP Service Account Example (Python)

Setup:
  pip install pulumi pulumi_gcp
Usage:
  pulumi up
"""
import pulumi
import pulumi_gcp as gcp

sa = gcp.serviceaccount.Account('example-sa',
    account_id='example-sa',
    display_name='Example Service Account'
)
pulumi.export('service_account_email', sa.email)
