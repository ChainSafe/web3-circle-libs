# Circle SDK Setup

CLI tool for setting up Circle SDK configuration. This tool helps you generate and configure the necessary secrets and environment variables for using the Circle SDK.

## Usage

Run the setup command with your Circle API key:

```bash
npx circle-sdk-setup --api-key YOUR_API_KEY
```

Options:

- `-k, --api-key <key>` (required): Your Circle API key

The tool will:

1. Generate a secret for the SDK
2. Fetch your app configuration from Circle
3. Save the configuration to `.env` file
4. Generate a recovery file (`recovery_file_YYYY-MM-DD.dat`)

⚠️ **Important**: After setup, store the `recovery_file_YYYY-MM-DD.dat` file in a secure location and remove it from your project directory.

## Development

```bash
# Build the package
yarn build

# Run in development mode
yarn dev
```
