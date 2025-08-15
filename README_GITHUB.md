# Pulumi Infra Project

This repository contains infrastructure-as-code for AWS, Azure, and GCP using Pulumi and TypeScript.

## Structure
- `pulumi/providers/` — Cloud provider modules (AWS, Azure, GCP)
- `pulumi/components/` — Shared components
- `pulumi/automation/` — Automation scripts
- `pulumi/policies/` — Compliance and tagging policies
- `pulumi/tests/` — Unit and integration tests
- `package.json` — Project dependencies
- `.gitignore` — Files to exclude from version control
- `.gitattributes` — Line ending and file type settings

## Getting Started
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Configure your cloud credentials (AWS, Azure, GCP).
3. Use Pulumi CLI to preview and deploy stacks:
   ```powershell
   pulumi up
   ```

## Notes
- Sensitive files and build artifacts are excluded via `.gitignore`.
- See `README.md` and subfolder READMEs for more details.
