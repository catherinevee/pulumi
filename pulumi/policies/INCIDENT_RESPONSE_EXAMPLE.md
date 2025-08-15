# Incident Response Example

## Automated Alerting
- Use CloudWatch, Azure Monitor, or GCP Operations Suite to trigger alerts on suspicious activity.
- Integrate with PagerDuty, SNS, or custom webhooks for notifications.

## Containment Example
```typescript
// Example: Disable IAM user on alert
import * as aws from "@pulumi/aws";

const disableUser = new aws.iam.UserPolicy("disable-user-policy", {
    user: "malicious-user",
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Deny",
            Action: "*",
            Resource: "*"
        }]
    })
});
```

## Recovery Example
- Restore S3 bucket or RDS database from latest backup or snapshot.
