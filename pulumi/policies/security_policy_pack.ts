import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { EnforcementLevel, PolicyPack, ReportViolation, ResourceValidationPolicy, validateResourceOfType } from "@pulumi/policy";

// Policy: S3 buckets must not be publicly accessible
const noPublicS3Buckets = validateResourceOfType(aws.s3.Bucket, (bucket, args, reportViolation) => {
    if (bucket.acl === "public-read" || bucket.acl === "public-read-write") {
        reportViolation("S3 buckets cannot be publicly accessible");
    }
    // Check for public access block
    const publicAccessBlock = args.getResourceByType(aws.s3.BucketPublicAccessBlock);
    if (!publicAccessBlock || 
        !publicAccessBlock.blockPublicAcls || 
        !publicAccessBlock.blockPublicPolicy ||
        !publicAccessBlock.ignorePublicAcls ||
        !publicAccessBlock.restrictPublicBuckets) {
        reportViolation("S3 buckets must have all public access blocks enabled");
    }
});

// Policy: All storage resources must be encrypted
const encryptedStorageRequired = (args, reportViolation) => {
    if (args.type === "aws:s3/bucket:Bucket") {
        const encryption = args.props.serverSideEncryptionConfiguration;
        if (!encryption || !encryption.rules || encryption.rules.length === 0) {
            reportViolation("S3 buckets must have server-side encryption enabled");
        }
    }
    if (args.type === "aws:rds/instance:Instance") {
        if (!args.props.storageEncrypted) {
            reportViolation("RDS instances must have storage encryption enabled");
        }
        if (!args.props.kmsKeyId) {
            reportViolation("RDS instances must use customer-managed KMS keys");
        }
    }
    if (args.type === "aws:ebs/volume:Volume") {
        if (!args.props.encrypted) {
            reportViolation("EBS volumes must be encrypted");
        }
    }
};

// Policy: Security groups must follow least privilege principle
const networkSecurityGroups = validateResourceOfType(aws.ec2.SecurityGroup, (sg, args, reportViolation) => {
    sg.ingress?.forEach(rule => {
        if (rule.cidrBlocks?.includes("0.0.0.0/0")) {
            const allowedPorts = [80, 443];
            if (!allowedPorts.includes(rule.fromPort) || rule.fromPort !== rule.toPort) {
                reportViolation(`Security group allows unrestricted access from internet on port ${rule.fromPort}`);
            }
        }
        if ((rule.fromPort === 22 || rule.fromPort === 3389) && 
            rule.cidrBlocks?.includes("0.0.0.0/0")) {
            reportViolation("SSH/RDP must not be open to the internet");
        }
    });
    if (!sg.egress || sg.egress.length === 0) {
        reportViolation("Security groups must have explicit egress rules defined");
    }
});

// Policy: IAM policies must follow least privilege principle
const iamLeastPrivilege = (args, reportViolation) => {
    if (args.type === "aws:iam/role:Role" || args.type === "aws:iam/policy:Policy") {
        const policy = args.props.policy || args.props.assumeRolePolicy;
        if (policy) {
            const policyDoc = JSON.parse(policy);
            policyDoc.Statement?.forEach(statement => {
                if (statement.Effect === "Allow" && 
                    statement.Action === "*" && 
                    statement.Resource === "*") {
                    reportViolation("IAM policies cannot use '*' for both Action and Resource");
                }
                const dangerousActions = [
                    "iam:CreateAccessKey",
                    "iam:DeleteAccessKey",
                    "sts:AssumeRole",
                    "kms:Decrypt",
                    "kms:GenerateDataKey"
                ];
                if (Array.isArray(statement.Action)) {
                    const hasDangerous = statement.Action.some(action => 
                        dangerousActions.includes(action) || action.includes("*")
                    );
                    if (hasDangerous && !statement.Condition) {
                        reportViolation("Dangerous IAM actions must have conditions attached");
                    }
                }
                // Enforce MFA requirement
                if (statement.Condition && statement.Condition.Bool) {
                    if (statement.Condition.Bool["aws:MultiFactorAuthPresent"] !== "true") {
                        reportViolation("IAM roles must require MFA (aws:MultiFactorAuthPresent=true)");
                    }
                } else {
                    reportViolation("IAM roles must require MFA (aws:MultiFactorAuthPresent=true)");
                }
                // Enforce session duration limits
                if (args.props.maxSessionDuration && args.props.maxSessionDuration > 3600) {
                    reportViolation("IAM role session duration must not exceed 1 hour");
                }
                // Enforce permissions boundary
                if (!args.props.permissionsBoundary) {
                    reportViolation("IAM roles must have a permissions boundary defined");
                }
                // Enforce cross-account trust controls
                if (statement.Principal && statement.Principal.AWS && typeof statement.Principal.AWS === "string") {
                    if (statement.Principal.AWS.startsWith("arn:aws:iam::") && statement.Action === "sts:AssumeRole") {
                        if (!statement.Condition || !statement.Condition.StringEquals || !statement.Condition.StringEquals["sts:ExternalId"]) {
                            reportViolation("Cross-account AssumeRole must require an ExternalId");
                        }
                        if (!statement.Condition || !statement.Condition.IpAddress || !statement.Condition.IpAddress["aws:SourceIp"]) {
                            reportViolation("Cross-account AssumeRole should restrict source IPs");
                        }
                    }
                }
            });
        }
    }
};

export const securityPolicyPack = new PolicyPack("security-policy-pack", {
    policies: [
        new ResourceValidationPolicy("no-public-s3-buckets", {
            description: "S3 buckets must not be publicly accessible",
            enforcementLevel: EnforcementLevel.MANDATORY,
            validateResource: noPublicS3Buckets,
        }),
        new ResourceValidationPolicy("encrypted-storage-required", {
            description: "All storage resources must be encrypted",
            enforcementLevel: EnforcementLevel.MANDATORY,
            validation: encryptedStorageRequired,
        }),
        new ResourceValidationPolicy("network-security-groups", {
            description: "Security groups must follow least privilege principle",
            enforcementLevel: EnforcementLevel.MANDATORY,
            validateResource: networkSecurityGroups,
        }),
        new ResourceValidationPolicy("iam-least-privilege", {
            description: "IAM policies must follow least privilege principle",
            enforcementLevel: EnforcementLevel.MANDATORY,
            validation: iamLeastPrivilege,
        })
    ],
});
