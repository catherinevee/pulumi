"""
Pulumi DigitalOcean Droplet Example (Python)

Setup:
  pip install pulumi pulumi_digitalocean
Usage:
  pulumi up
"""
import pulumi
import pulumi_digitalocean as do

droplet = do.Droplet('example-droplet',
    image='ubuntu-22-04-x64',
    region='nyc3',
    size='s-1vcpu-1gb'
)
pulumi.export('droplet_id', droplet.id)
pulumi.export('droplet_ip', droplet.ipv4_address)
