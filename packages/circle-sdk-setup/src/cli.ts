#!/usr/bin/env node

import { CircleSdk, RegisteredEntity, SecretApi } from 'web3-circle-sdk';
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

interface SetupOptions {
  apiKey: string;
  envPath?: string;
}

class CircleSdkSetup {
  private options: Required<SetupOptions>;

  constructor(options: SetupOptions) {
    this.options = {
      envPath: path.resolve(process.cwd(), '.env'),
      ...options,
    };
  }

  async checkExistingConfig(): Promise<boolean> {
    console.log('Checking existing configuration...');
    try {
      if (fs.existsSync(this.options.envPath)) {
        const envContent = dotenv.parse(fs.readFileSync(this.options.envPath));
        return !!(envContent.CIRCLE_SECRET && envContent.CIRCLE_APP_ID);
      }
      return false;
    } catch (error) {
      console.error('Error checking existing configuration:', error);
      return false;
    }
  }

  async generateSecret(): Promise<string> {
    console.log('Generating secret...');
    const secret = SecretApi.generateSecret();
    console.log('Secret generated:', secret);
    return secret;
  }

  async initializeSdk(apiKey: string, secret: string): Promise<CircleSdk> {
    console.log('Initializing Circle SDK...');
    return new CircleSdk(apiKey, secret);
  }

  async fetchConfiguration(sdk: CircleSdk) {
    console.log('Fetching configuration...');
    const config = await sdk.secret.getConfig();
    console.log('Configuration fetched:', JSON.stringify(config, null, 2));
    return config;
  }

  async fetchPublicKey(sdk: CircleSdk) {
    console.log('Fetching public key...');
    const publicKey = await sdk.secret.getPublicKey();
    console.log('Public key retrieved');
    return publicKey;
  }

  generateCiphertext(secret: string, publicKey: string) {
    console.log('Generating entity secret ciphertext...');
    const cipherText = SecretApi.getEntitySecretCiphertext(secret, publicKey);
    console.log('Ciphertext generated');
    return cipherText;
  }

  async registerCiphertext(sdk: CircleSdk, cipherText: string) {
    try {
      console.log('Registering entity secret ciphertext...');
      const registration = await sdk.secret.registerEntitySecretCiphertext(cipherText);
      console.log('Entity secret ciphertext registered');
      return registration;
    } catch (error: unknown) {
      if (
        (typeof error === 'object' && (error as any).code === -1) ||
        ((error as Error).message &&
          (error as Error).message.includes('Something went wrong'))
      ) {
        console.error('\n🚫 Error: Unable to register entity secret ciphertext.');
        console.error('This might be due to the ciphertext already being registered.');
        console.error('Please check your existing configuration in the Circle Console.');
        process.exit(1);
      }

      // Re-throw other types of errors
      throw error;
    }
  }

  prepareEnvFile(config: any, secret: string, apiKey: string) {
    console.log('Preparing .env file...');
    let envContent = '';
    if (fs.existsSync(this.options.envPath)) {
      envContent = fs.readFileSync(this.options.envPath, 'utf-8');
      // Remove existing Circle config if any
      envContent = envContent
        .split('\n')
        .filter((line) => !line.startsWith('CIRCLE_'))
        .join('\n');
      if (envContent && !envContent.endsWith('\n')) {
        envContent += '\n';
      }
    }

    // Add new Circle config
    console.log('Adding new configuration to .env...');
    const newConfig = `CIRCLE_API_KEY=${apiKey}
CIRCLE_SECRET=${secret}
CIRCLE_APP_ID=${config.appId}\n`;

    fs.writeFileSync(this.options.envPath, envContent + newConfig);
    console.log('.env file updated successfully');
  }

  saveRecoveryFile(registration: RegisteredEntity) {
    const currentDate = new Date().toISOString().split('T')[0];
    const recoveryFilePath = path.resolve(
      process.cwd(),
      `recovery_file_${currentDate}.dat`,
    );

    try {
      fs.writeFileSync(recoveryFilePath, registration.recoveryFile, 'utf-8');
      console.log(`Recovery file saved to: ${recoveryFilePath}`);
      console.log(
        '\nIMPORTANT: Keep the recovery file in a secure location and then remove it from this directory',
      );
    } catch (error) {
      console.error('Error saving recovery file:', error);
    }
  }

  async run() {
    // Check if config already exists
    const configExists = await this.checkExistingConfig();
    if (configExists) {
      console.error('Circle SDK configuration already exists in .env file.');
      console.error(
        'Please remove the existing configuration before setting up a new one.',
      );
      process.exit(1);
    }

    try {
      // Generate secret
      const secret = await this.generateSecret();

      // Initialize SDK
      const sdk = await this.initializeSdk(this.options.apiKey, secret);

      // Fetch configuration
      const config = await this.fetchConfiguration(sdk);

      // Fetch public key
      const publicKey = await this.fetchPublicKey(sdk);

      // Generate ciphertext
      const cipherText = this.generateCiphertext(secret, publicKey);

      // Register ciphertext
      const registration = await this.registerCiphertext(sdk, cipherText);

      // Prepare .env file
      this.prepareEnvFile(config, secret, this.options.apiKey);

      // Save recovery file
      this.saveRecoveryFile(registration);

      console.log('Circle SDK setup completed successfully!');
    } catch (error) {
      console.error('Error during setup:', error);
      process.exit(1);
    }
  }
}

async function main() {
  const program = new Command();

  program
    .name('circle-sdk-setup')
    .description('Setup tool for Circle SDK')
    .requiredOption('-k, --api-key <key>', 'Circle API Key')
    .parse(process.argv);

  const options = program.opts();

  const setup = new CircleSdkSetup({
    apiKey: options.apiKey,
  });

  await setup.run();
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
