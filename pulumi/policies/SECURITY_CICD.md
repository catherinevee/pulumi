# Security Scanning in CI/CD

Integrate automated security scanning into your CI/CD pipeline to detect vulnerabilities and enforce compliance before deployment.

## Recommended Tools
- **Checkov**: Infrastructure as code static analysis
- **tfsec**: Security scanner for Terraform
- **Snyk**: Dependency and code vulnerability scanner

## Example GitHub Actions Workflow

```yaml
name: Security Scanning
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - name: Install Checkov
        run: pip install checkov
      - name: Run Checkov
        run: checkov -d . --soft-fail
      - name: Install tfsec
        run: |
          curl -L https://github.com/aquasecurity/tfsec/releases/latest/download/tfsec-linux-amd64 -o tfsec
          chmod +x tfsec
          sudo mv tfsec /usr/local/bin/
      - name: Run tfsec
        run: tfsec .
      - name: Install Snyk
        run: npm install -g snyk
      - name: Run Snyk
        run: snyk test
```

## Failing Builds on Critical Findings
- Configure each tool to fail the build if critical vulnerabilities are found.
- Review and remediate issues before merging or deploying.

## References
- [Checkov Documentation](https://www.checkov.io/)
- [tfsec Documentation](https://tfsec.dev/)
- [Snyk Documentation](https://snyk.io/docs/)
