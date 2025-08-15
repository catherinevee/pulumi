import * as pulumi from "@pulumi/pulumi";
import { esc } from "@pulumi/esc-sdk";

// Define the environment configurations
const environments = {
    dev: {
        region: "us-west-2",
        secrets: {
            dbPassword: pulumi.secret("dev-db-password"),
            apiKey: pulumi.secret("dev-api-key"),
        },
    },
    prod: {
        region: "us-east-1",
        secrets: {
            dbPassword: pulumi.secret("prod-db-password"),
            apiKey: pulumi.secret("prod-api-key"),
        },
    },
};

// Create ESC environments
for (const [envName, config] of Object.entries(environments)) {
    new esc.Environment(envName, {
        values: {
            aws: {
                region: config.region,
                secrets: config.secrets,
            },
        },
    });
}