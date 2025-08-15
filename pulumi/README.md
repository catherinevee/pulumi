
# Pulumi Infrastructure Project

## Overview
This project manages cloud infrastructure across AWS, Azure, and GCP using Pulumi. It supports multiple environments and enforces compliance and tagging policies.

## Directory Structure

## Setup
1. Install [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
2. Configure cloud provider credentials
3. Install dependencies:
  ```powershell
  npm install
  ```

## Usage

## Testing
See `tests/README.md` for details.

## Policy Enforcement
See `policies/README.md` for details.

## Secrets Management
Use Pulumi config and provider-specific secret managers (e.g., AWS Secrets Manager, Azure Key Vault).

## CI/CD
See `.github/workflows/pulumi-deploy.yml` for automated deployment setup.
# Pulumi Infrastructure Project

## Overview
This project manages cloud infrastructure across AWS, Azure, and GCP using Pulumi. It supports multiple environments and enforces compliance and tagging policies.


## Directory Structure
```text
pulumi/
├── automation/
│   ├── api.ts
│   ├── common_tasks.ps1
│   └── README.md
├── aws/
├── azure/
├── components/
│   ├── logging/
│   ├── README.md
│   ├── shared/
│   │   └── shared_module.ts
│   ├── tagging/
│   └── unified_cluster.go
├── environments/
│   ├── dev/
│   ├── prod/
│   └── README.md
├── esc/
├── examples/
│   ├── python/
│   ├── README.md
│   └── typescript/
├── gcp/
├── policies/
│   ├── ACCESS_REVIEW.md
│   ├── BACKUP_RECOVERY.md
│   ├── compliance_policy.ts
│   ├── DISASTER_RECOVERY.md
│   ├── DISASTER_RECOVERY_EXAMPLE.md
│   ├── INCIDENT_RESPONSE.md
│   ├── INCIDENT_RESPONSE_EXAMPLE.md
│   ├── INCIDENT_RESPONSE_PLAYBOOK.md
│   ├── MONITORING_ALERTING.md
│   ├── MONITORING_ALERTING_EXAMPLE.md
│   ├── README.md
│   ├── README_SECURITY.md
│   ├── SECURITY_CICD.md
│   ├── security_policy_pack.ts
│   ├── SECURITY_TRAINING.md
│   ├── SECURITY_TRAINING_EXAMPLE.md
│   ├── tagging_policy.py
│   ├── VULNERABILITY_SCANNING.md
│   └── VULNERABILITY_SCANNING_EXAMPLE.md
├── providers/
│   ├── aws/
│   ├── azure/
│   ├── digitalocean/
│   ├── gcp/
│   └── README.md
├── tests/
│   ├── aws/
│   ├── azure/
│   ├── digitalocean/
│   ├── gcp/
│   ├── README.md
│   ├── test_network_stack.ts
│   └── test_s3_bucket_encryption.py
└── README.md
```

## Setup
1. Install [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
2. Configure cloud provider credentials
3. Install dependencies:
  ```powershell
  npm install
  ```

## Usage
- Preview changes: `pulumi preview`
- Deploy: `pulumi up`
- Destroy: `pulumi destroy`
- Use automation scripts: `automation/common_tasks.ps1`

## Testing
See `tests/README.md` for details.

## Policy Enforcement
See `policies/README.md` for details.

## Secrets Management
Use Pulumi config and provider-specific secret managers (e.g., AWS Secrets Manager, Azure Key Vault).

## CI/CD
See `.github/workflows/pulumi-deploy.yml` for automated deployment setup.