from pulumi_policy import (
    EnforcementLevel,
    PolicyPack,
    ReportViolation,
    ResourceValidationPolicy
)

def enforce_required_tags(args, report_violation):
    """Ensure all resources have required tags."""
    required_tags = ["Environment", "Owner", "CostCenter", "Project"]
    
    tags = args.props.get("tags", {})
    for tag in required_tags:
        if tag not in tags:
            report_violation(f"Missing required tag: {tag}")

tagging_policy = ResourceValidationPolicy(
    name="required-tags",
    description="Enforce required tags on all resources",
    enforcement_level=EnforcementLevel.MANDATORY,
    validation=enforce_required_tags
)