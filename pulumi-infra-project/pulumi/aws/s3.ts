import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an S3 bucket
const bucket = new aws.s3.Bucket("my-bucket", {
    acl: "private",
    versioning: {
        enabled: true,
    },
    lifecycleRules: [{
        enabled: true,
        transitions: [{
            days: 30,
            storageClass: "STANDARD_IA",
        }, {
            days: 90,
            storageClass: "GLACIER",
        }],
        expiration: {
            days: 365,
        },
    }],
});

// Export the bucket name
export const bucketName = bucket.id;