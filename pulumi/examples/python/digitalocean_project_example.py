# Pulumi DigitalOcean Project Example (Python)
import pulumi
import pulumi_digitalocean as digitalocean

example_project = digitalocean.Project(
    "example-project",
    name="Example Project",
    purpose="Web Application",
    environment="Development",
    description="Project for IAM example"
)

pulumi.export("project_id", example_project.id)
