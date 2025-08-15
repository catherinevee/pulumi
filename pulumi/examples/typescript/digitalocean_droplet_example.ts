
# Pulumi DigitalOcean Droplet Example (Python)
import pulumi
import pulumi_digitalocean as digitalocean

example_droplet = digitalocean.Droplet(
    "example-droplet",
    image="ubuntu-22-04-x64",
    region="nyc3",
    size="s-1vcpu-1gb"
)

pulumi.export("droplet_id", example_droplet.id)
pulumi.export("droplet_ip", example_droplet.ipv4_address)
