
# Pulumi DigitalOcean Firewall Example (Python)
import pulumi
import pulumi_digitalocean as digitalocean

example_firewall = digitalocean.Firewall(
    "example-firewall",
    droplet_ids=[],
    inbound_rules=[{
        "protocol": "tcp",
        "port_range": "22",
        "source_addresses": ["0.0.0.0/0"]
    }],
    outbound_rules=[{
        "protocol": "tcp",
        "port_range": "all",
        "destination_addresses": ["0.0.0.0/0"]
    }]
)

pulumi.export("firewall_id", example_firewall.id)
