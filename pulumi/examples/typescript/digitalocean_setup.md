# DigitalOcean Setup Guide for Pulumi

## Prerequisites
- Create a DigitalOcean account
- Generate a Personal Access Token (API token) from the DigitalOcean dashboard

## Pulumi Provider Configuration
1. Install the Pulumi DigitalOcean provider:
   ```bash
   npm install @pulumi/digitalocean
   ```
2. Set the DigitalOcean token as an environment variable:
   ```bash
   export DIGITALOCEAN_TOKEN=your_token_here
   ```
   Or on Windows:
   ```powershell
   $env:DIGITALOCEAN_TOKEN="your_token_here"
   ```
3. Reference the provider in your Pulumi program (see examples in this folder).

## Example Usage
- See `digitalocean_droplet_example.ts`, `digitalocean_spaces_example.ts`, etc. for resource creation.

## Documentation
- [Pulumi DigitalOcean Provider](https://www.pulumi.com/registry/packages/digitalocean/)
- [DigitalOcean API Docs](https://docs.digitalocean.com/reference/api/)
