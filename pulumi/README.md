
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
│   ├── ecs.ts
│   ├── index.ts
│   ├── s3.ts
│   └── vpc.ts
├── azure/
│   ├── aks.ts
│   ├── index.ts
│   └── network.ts
├── components/
│   ├── logging/
│   ├── README.md
│   ├── shared/
│   │   ├── shared_module.ts
│   │   └── unified_cluster.go
│   ├── tagging/
│   └── unified_cluster.go
├── environments/
│   ├── dev/
│   ├── prod/
│   └── README.md
├── esc/
│   └── environments.ts
├── examples/
│   ├── python/
│   │   ├── aws/
│   │   │   ├── aws_dynamodb_example.py
│   │   │   ├── aws_iam_user_example.py
│   │   │   ├── aws_kms_key_example.py
│   │   │   ├── aws_s3_example.py
│   │   │   └── aws_vpc_example.py
│   │   ├── azure/
│   │   │   ├── azure_ad_user_example.py
│   │   │   ├── azure_key_vault_example.py
│   │   │   ├── azure_storage_example.py
│   │   │   ├── azure_vnet_advanced_example.py
│   │   │   └── azure_vnet_example.py
│   │   ├── digitalocean/
│   │   │   ├── digitalocean_droplet_example.py
│   │   │   ├── digitalocean_firewall_example.py
│   │   │   ├── digitalocean_loadbalancer_example.py
│   │   │   ├── digitalocean_project_member_example.py
│   │   │   └── digitalocean_spaces_example.py
│   │   ├── gcp/
│   │   │   ├── gcp_cloud_nat_example.py
│   │   │   ├── gcp_kms_keyring_example.py
│   │   │   ├── gcp_pubsub_example.py
│   │   │   ├── gcp_service_account_example.py
│   │   │   └── gcp_storage_example.py
│   ├── README.md
│   └── typescript/
│       ├── digitalocean_droplet_example.ts
│       ├── digitalocean_firewall_example.ts
│       ├── digitalocean_loadbalancer_example.ts
│       ├── digitalocean_project_example.ts
│       ├── digitalocean_setup.md
│       ├── digitalocean_spaces_example.ts
│       ├── Pulumi.dev.yaml
│       ├── Pulumi.prod.yaml
│       └── Pulumi.staging.yaml
├── gcp/
│   ├── gke.ts
│   ├── index.ts
│   └── network.ts
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
│   │   ├── compute/
│   │   ├── ecs.ts
│   │   ├── iam/
│   │   ├── index.ts
│   │   ├── networking/
│   │   ├── rds_backup_example.ts
│   │   ├── s3.ts
│   │   ├── security/
│   │   └── vpc.ts
│   ├── azure/
│   │   ├── aks.ts
│   │   ├── compute/
│   │   ├── iam/
│   │   ├── index.ts
│   │   ├── network.ts
│   │   ├── networking/
│   │   └── security/
│   ├── digitalocean/
│   │   ├── compute/
│   │   ├── iam/
│   │   ├── networking/
│   │   └── security/
│   ├── gcp/
│   │   ├── compute/
│   │   ├── gke.ts
│   │   ├── iam/
│   │   ├── index.ts
│   │   ├── network.ts
│   │   ├── networking/
│   │   └── security/
│   └── README.md
├── tests/
│   ├── aws/
│   │   ├── test_network_stack.ts
│   │   └── test_s3_bucket_encryption.py
│   ├── azure/
│   ├── digitalocean/
│   │   └── test_droplet.py
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