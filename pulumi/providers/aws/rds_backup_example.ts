import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export class RDSBackup {
    constructor(name: string) {
        const db = new aws.rds.Instance(name, {
            allocatedStorage: 20,
            engine: "mysql",
            instanceClass: "db.t3.micro",
            name: "mydb",
            username: "admin",
            password: pulumi.secret(process.env.RDS_PASSWORD || ""),
            backupRetentionPeriod: 7, // Retain backups for 7 days
            skipFinalSnapshot: false,
            finalSnapshotIdentifier: `${name}-final-snapshot`,
            tags: { Name: name },
        });
        // Automated snapshot backup
        new aws.rds.Snapshot(`${name}-snapshot`, {
            dbInstanceIdentifier: db.id,
            tags: { Name: `${name}-snapshot` },
        });
    }
}
