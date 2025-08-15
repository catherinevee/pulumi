"""
Pulumi DigitalOcean Load Balancer Example (Python)

Setup:
  pip install pulumi pulumi_digitalocean
Usage:
  pulumi up
"""
import pulumi
import pulumi_digitalocean as do

lb = do.LoadBalancer('example-lb',
    region='nyc3',
    forwarding_rules=[do.LoadBalancerForwardingRuleArgs(
        entry_protocol='http',
        entry_port=80,
        target_protocol='http',
        target_port=80
    )]
)
pulumi.export('loadbalancer_id', lb.id)
