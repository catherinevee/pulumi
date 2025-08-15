"""
Pulumi DigitalOcean Spaces Bucket Example (Python)

Setup:
  pip install pulumi pulumi_digitalocean
Usage:
  pulumi up
"""
import pulumi
import pulumi_digitalocean as digitalocean

bucket = do.SpacesBucket('example-space',
    region='nyc3'
)
example_space = digitalocean.SpacesBucket(
  "example-space",
  region="nyc3"
)

pulumi.export("bucket_name", example_space.name)
