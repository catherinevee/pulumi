# Using Remote Backends with Pulumi

You can store your Pulumi state files in cloud storage for team collaboration and reliability. Below are examples for AWS S3, Azure Blob Storage, and Google Cloud Storage.

---

## AWS S3 Backend

1. **Create an S3 bucket** (if you don't have one):
   ```powershell
   aws s3 mb s3://your-pulumi-state-bucket
   ```

2. **Login to the S3 backend with Pulumi:**
   ```powershell
   pulumi login s3://your-pulumi-state-bucket
   ```
   Replace `your-pulumi-state-bucket` with your actual bucket name.

3. **Verify backend configuration:**
   ```powershell
   pulumi whoami
   ```

---

## Azure Blob Storage Backend

1. **Create a storage account and container:**
   ```powershell
   az storage account create --name <storage-account> --resource-group <resource-group> --location <location>
   az storage container create --account-name <storage-account> --name <container-name>
   ```

2. **Login to the Azure backend with Pulumi:**
   ```powershell
   pulumi login azblob://<container-name>
   ```
   You may need to set environment variables for authentication, e.g. `AZURE_STORAGE_ACCOUNT` and `AZURE_STORAGE_KEY`.

3. **Verify backend configuration:**
   ```powershell
   pulumi whoami
   ```

---

## Google Cloud Storage Backend

1. **Create a GCS bucket:**
   ```powershell
   gsutil mb gs://your-pulumi-state-bucket
   ```

2. **Login to the GCP backend with Pulumi:**
   ```powershell
   pulumi login gs://your-pulumi-state-bucket
   ```
   Make sure you have authenticated with Google Cloud (`gcloud auth login`).

3. **Verify backend configuration:**
   ```powershell
   pulumi whoami
   ```

---

## Notes
- You must have cloud provider credentials configured (AWS, Azure, or GCP).
- All team members should use the same backend for shared state.
- You can specify a path within the bucket/container, e.g. `s3://your-bucket/path/to/state`.

For more details, see the official Pulumi documentation for [backends](https://www.pulumi.com/docs/using-pulumi/backends/).
