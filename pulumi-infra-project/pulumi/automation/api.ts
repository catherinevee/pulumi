import { LocalWorkspace, Stack } from "@pulumi/pulumi/automation";
import * as express from "express";

const app = express();

app.use(express.json());

app.post("/provision-environment", async (req, res) => {
    const { environmentName, config } = req.body;

    // Create or select stack
    const stack = await LocalWorkspace.createOrSelectStack({
        stackName: environmentName,
        projectName: "pulumi-infra-project",
        program: async () => {
            // Define infrastructure programmatically
            // Example: Create a VPC
            const vpc = new aws.ec2.Vpc("vpc", {
                cidrBlock: config.vpcCidr,
                enableDnsHostnames: true,
                enableDnsSupport: true,
            });

            return {
                vpcId: vpc.id,
                vpcArn: vpc.arn,
            };
        },
    });

    // Set configuration
    await stack.setConfig("aws:region", { value: config.region });

    // Deploy
    const upResult = await stack.up({ onOutput: console.log });

    res.json({
        success: true,
        outputs: upResult.outputs,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Automation API server is running on port ${PORT}`);
});