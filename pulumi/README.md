
# Pulumi Infrastructure Project

## Overview
This project manages cloud infrastructure across AWS, Azure, GCP, and DigitalOcean using Pulumi. It supports multiple environments and enforces compliance and tagging policies.

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
```text
pulumi/
├── automation/
│   ├── api.ts
│   └── common_tasks.ps1
├── aws/
│   ├── ecs.ts
│   ├── index.ts
│   ├── s3.ts
│   └── vpc.ts
├── azure/
│   ├── aks.ts
│   ├── index.ts
│   └── network.ts
├── components/
│   ├── shared/
│   │   ├── shared_module.ts
│   │   └── unified_cluster.go
├── environments/
│   ├── dev/
│   └── prod/
├── esc/
│   └── environments.ts
├── examples/
│   ├── python/
│   │   ├── aws/
│   │   ├── azure/
│   │   ├── digitalocean/
│   │   └── gcp/
│   └── README.md
├── gcp/
│   ├── gke.ts
│   ├── index.ts
│   └── network.ts
├── policies/
│   ├── ACCESS_REVIEW.md
│   ├── BACKUP_RECOVERY.md
│   ├── compliance_policy.ts
│   ├── DISASTER_RECOVERY.md
│   ├── INCIDENT_RESPONSE.md
│   ├── MONITORING_ALERTING.md
│   ├── README.md
│   ├── README_SECURITY.md
│   ├── SECURITY_CICD.md
│   ├── security_policy_pack.ts
│   ├── SECURITY_TRAINING.md
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
│   └── README.md
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

## Supported Providers
- AWS
- Azure
- GCP
- DigitalOcean

## Testing
See `tests/README.md` for details.

## Policy Enforcement
See `policies/README.md` for details.

## Secrets Management
Use Pulumi config and provider-specific secret managers (e.g., AWS Secrets Manager, Azure Key Vault).

## CI/CD
See `.github/workflows/pulumi-deploy.yml` for automated deployment setup.