"""
Pulumi DigitalOcean Firewall Example (Python)

Setup:
  pip install pulumi pulumi_digitalocean
Usage:
  pulumi up
"""
import pulumi
import pulumi_digitalocean as do

firewall = do.Firewall('example-firewall',
    droplet_ids=[],
    inbound_rules=[do.FirewallInboundRuleArgs(
        protocol='tcp',
        port_range='22',
        source_addresses=['0.0.0.0/0']
    )],
    outbound_rules=[do.FirewallOutboundRuleArgs(
        protocol='tcp',
        port_range='all',
        destination_addresses=['0.0.0.0/0']
    )]
)
pulumi.export('firewall_id', firewall.id)
