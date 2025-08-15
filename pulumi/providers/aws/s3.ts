import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

/**
 * S3 bucket component for AWS with encryption, replication, and compliance retention.
 * Example usage:
 *   const s3 = new S3("my-s3-bucket", { kmsKeyId: pulumi.secret("key-id"), tags: { Project: "Demo" } });
 */
export class S3 {
	public bucketName: pulumi.Output<string>;
	constructor(name: string, args?: { kmsKeyId?: pulumi.Input<string>; tags?: { [key: string]: string } }) {
		const bucket = new aws.s3.Bucket(name, {
			acl: "private",
			versioning: { enabled: true },
			objectLockConfiguration: {
				objectLockEnabled: true,
				rule: {
					defaultRetention: {
						mode: "COMPLIANCE",
						days: 365,
					},
				},
			},
			serverSideEncryptionConfiguration: args?.kmsKeyId ? {
				rules: [{
					applyServerSideEncryptionByDefault: {
						sseAlgorithm: "aws:kms",
						kmsMasterKeyId: pulumi.secret(args.kmsKeyId || ""),
					},
				}],
			} : undefined,
			tags: args?.tags,
			lifecycleRules: [{
				enabled: true,
				transitions: [
					{ days: 30, storageClass: "STANDARD_IA" },
					{ days: 90, storageClass: "GLACIER" }
				],
				expiration: { days: 365 },
			}],
		});
		this.bucketName = bucket.id;
	}
}
