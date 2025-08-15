"""
Basic test for DigitalOcean Droplet resource using Pulumi Python
"""
import pulumi
import pulumi_digitalocean as do

def test_droplet_creation():
    droplet = do.Droplet('test-droplet',
        image='ubuntu-22-04-x64',
        region='nyc3',
        size='s-1vcpu-1gb'
    )
    assert droplet.name == 'test-droplet'
