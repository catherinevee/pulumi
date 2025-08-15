# Backup & Disaster Recovery Examples

## S3 Cross-Region Replication
- S3 buckets are configured for cross-region replication and compliance retention.

## RDS Automated Backups
- RDS instances use automated backups and periodic snapshots.
- Example: See `providers/aws/rds_backup_example.ts`.

## VPC Security
- Security groups now enforce least privilege by restricting access to specific CIDRs.

## Recommendations
- Schedule regular backup validation and restoration tests.
- Enable cross-region replication for all critical data.
- Document recovery procedures and test failover.

## References
- [AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
- [Pulumi Disaster Recovery](https://www.pulumi.com/docs/guides/disaster-recovery/)
