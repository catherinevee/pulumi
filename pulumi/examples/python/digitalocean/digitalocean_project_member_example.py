"""
Pulumi DigitalOcean Project Member Example (Python)

Setup:
  pip install pulumi pulumi_digitalocean
Usage:
  pulumi up
"""
import pulumi
import pulumi_digitalocean as do

# DigitalOcean Project Member management is limited; this is a placeholder for associating resources with a project
project = do.Project('example-project',
    name='Example Project',
    purpose='Web Application',
    environment='Development',
    description='Project for IAM example'
)
pulumi.export('project_id', project.id)
