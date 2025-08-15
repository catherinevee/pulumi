"""
Pulumi GCP Pub/Sub Topic Example (Python)

Setup:
  pip install pulumi pulumi_gcp
Usage:
  pulumi up
"""
import pulumi
import pulumi_gcp as gcp

topic = gcp.pubsub.Topic('example-topic')
pulumi.export('topic_name', topic.name)
