# Using S3 as a Pulumi Remote Backend

You can store your Pulumi state files in an AWS S3 bucket for team collaboration and reliability.

## Steps

1. **Create an S3 bucket** (if you don't have one):
   - You can use the AWS Console or CLI:
     ```powershell
     aws s3 mb s3://your-pulumi-state-bucket
     ```

2. **Login to the S3 backend with Pulumi:**
   - Run this command in your project directory:
     ```powershell
     pulumi login s3://your-pulumi-state-bucket
     ```
   - Replace `your-pulumi-state-bucket` with your actual bucket name.

3. **Verify backend configuration:**
   - After login, Pulumi will store state files in the S3 bucket.
   - You can check your current backend with:
     ```powershell
     pulumi whoami
     ```

## Notes
- You must have AWS credentials configured (e.g., via `aws configure`).
- All team members should use the same S3 bucket for shared state.
- You can specify a path within the bucket: `s3://your-bucket/path/to/state`.

For more details, see the [Pulumi S3 backend documentation](https://www.pulumi.com/docs/using-pulumi/backends/s3/).
