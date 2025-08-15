
# Pulumi Infrastructure Project

## Overview
This project manages cloud infrastructure across AWS, Azure, and GCP using Pulumi. It supports multiple environments and enforces compliance and tagging policies.

## Directory Structure
- `providers/` - Cloud provider-specific infrastructure code
- `components/` - Shared modules and reusable components
- `automation/` - Scripts for automating Pulumi operations
- `environments/` - Environment-specific configuration
- `policies/` - Compliance and tagging policies
- `tests/` - Unit and integration tests

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