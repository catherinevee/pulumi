
# Pulumi DigitalOcean Load Balancer Example (Python)
import pulumi
import pulumi_digitalocean as digitalocean

example_lb = digitalocean.LoadBalancer(
    "example-lb",
    region="nyc3",
    forwarding_rules=[{
        "entry_protocol": "http",
        "entry_port": 80,
        "target_protocol": "http",
        "target_port": 80
    }]
)

pulumi.export("load_balancer_id", example_lb.id)
