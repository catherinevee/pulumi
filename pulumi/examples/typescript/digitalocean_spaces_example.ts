
# Pulumi DigitalOcean Spaces Example (Python)
import pulumi
import pulumi_digitalocean as digitalocean

example_space = digitalocean.SpacesBucket(
    "example-space",
    region="nyc3"
)

pulumi.export("bucket_name", example_space.name)
