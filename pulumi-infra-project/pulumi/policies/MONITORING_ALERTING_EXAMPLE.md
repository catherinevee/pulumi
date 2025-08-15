# Monitoring & Alerting Example

## AWS CloudWatch Log Group
```typescript
import * as aws from "@pulumi/aws";

const logGroup = new aws.cloudwatch.LogGroup("app-log-group", {
    retentionInDays: 30,
    tags: { Environment: "prod" },
});
```

## CloudWatch Alarm
```typescript
import * as aws from "@pulumi/aws";

const alarm = new aws.cloudwatch.MetricAlarm("high-cpu", {
    namespace: "AWS/EC2",
    metricName: "CPUUtilization",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 2,
    threshold: 80,
    comparisonOperator: "GreaterThanThreshold",
    alarmActions: ["arn:aws:sns:us-west-2:123456789012:NotifyMe"],
    dimensions: { InstanceId: "i-1234567890abcdef0" },
});
```

## SIEM Integration
- Forward logs to SIEM (e.g., Splunk, Sentinel, Chronicle) using native integrations or log shipping agents.

## Alerting Integration
- Use SNS, PagerDuty, or custom webhook for incident notifications.
