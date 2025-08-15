# IAM Access Review & Certification Procedures

## Regular Access Reviews
- Schedule quarterly reviews of all IAM roles, policies, and permissions.
- Identify unused roles, excessive permissions, and orphaned accounts.
- Remove or restrict access as needed.

## Certification Steps
1. Export current IAM roles and policies.
2. Review for least privilege, MFA enforcement, session limits, and permissions boundaries.
3. Validate cross-account trust relationships (ExternalId, IP restrictions).
4. Document findings and remediation actions.
5. Certify compliance and sign-off by security/compliance officer.

## Documentation
- Maintain records of reviews, findings, and actions taken.
- Track certification status and next review date.

## References
- [AWS IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)
- [Pulumi IAM Best Practices](https://www.pulumi.com/docs/guides/secrets/#identity-and-access-management)
