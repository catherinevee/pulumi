"""
Pulumi GCP Cloud NAT Example (Python)

Setup:
  pip install pulumi pulumi_gcp
Usage:
  pulumi up
"""
import pulumi
import pulumi_gcp as gcp

router = gcp.compute.Router('example-router',
    network='default',
    region='us-central1'
)
nat = gcp.compute.RouterNat('example-nat',
    router=router.name,
    region='us-central1',
    nat_ip_allocate_option='AUTO_ONLY',
    source_subnetwork_ip_ranges_to_nat='ALL_SUBNETWORKS_ALL_IP_RANGES'
)
pulumi.export('nat_name', nat.name)
