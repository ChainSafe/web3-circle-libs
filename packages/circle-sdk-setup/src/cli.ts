#!/usr/bin/env node

import {
  initiateDeveloperControlledWalletsClient,
  ModelError,
  registerEntitySecretCiphertext,
  RegisterEntitySecretCipherTextInput,
} from '@circle-fin/developer-controlled-wallets';
import crypto from 'crypto';
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

  checkExistingConfig(): boolean {
    console.log('Checking existing configuration...');
    try {
      if (fs.existsSync(this.options.envPath)) {
        const envContent = dotenv.parse(fs.readFileSync(this.options.envPath));
        return !!(envContent.CIRCLE_SECRET && envContent.CIRCLE_API_KEY);
      }
      return false;
    } catch (error) {
      console.error('Error checking existing configuration:', error);
      return false;
    }
  }

  generateSecret(): string {
    console.log('Generating secret...');
    const secret = crypto.randomBytes(32).toString('hex');

    console.log('Secret generated:', secret);
    return secret;
  }

  async registerCiphertext(input: RegisterEntitySecretCipherTextInput) {
    try {
      console.log('Registering entity secret ciphertext...');
      const registration = await registerEntitySecretCiphertext(input);
      console.log('Entity secret ciphertext registered');
      return registration.data?.recoveryFile || '';
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response
      ) {
        const data = error.response.data as ModelError;

        console.error('\n🚫 Error: Unable to register entity secret ciphertext.');
        console.error('This might be due to the ciphertext already being registered.');
        console.error('Please check your existing configuration in the Circle Console.');
        process.exit(1);
      }

      // Re-throw other types of errors
      throw error;
    }
  }

  prepareEnvFile(secret: string, apiKey: string) {
    console.log('Preparing .env file...');
    let envContent = '';

    // Read existing content if file exists (it shouldn't)
    if (fs.existsSync(this.options.envPath)) {
      envContent = fs.readFileSync(this.options.envPath, 'utf-8');
      // Ensure there's a newline at the end
      if (!envContent.endsWith('\n')) {
        envContent += '\n';
      }
    }

    // Add new Circle config
    console.log('Adding new configuration to .env...');
    const newConfig = `CIRCLE_API_KEY=${apiKey}
CIRCLE_SECRET=${secret}\n`;

    // Append new config to existing content
    fs.writeFileSync(this.options.envPath, envContent + newConfig);
    console.log('.env file updated successfully');
  }

  saveRecoveryFile(recoveryFile: string) {
    const currentDate = new Date().toISOString().split('T')[0];
    const recoveryFilePath = path.resolve(
      process.cwd(),
      `recovery_file_${currentDate}.dat`,
    );

    try {
      fs.writeFileSync(recoveryFilePath, recoveryFile, 'utf-8');
      console.log(`Recovery file saved to: ${recoveryFilePath}`);
      console.log(
        '\nIMPORTANT: Keep the recovery file in a secure location and then remove it from this directory!\n',
      );
    } catch (error) {
      console.error('Error saving recovery file:', error);
    }
  }

  async run() {
    // Check if config already exists
    const configExists = this.checkExistingConfig();
    if (configExists) {
      console.error('Circle SDK configuration already exists in .env file.');
      console.error('Please check your existing configuration in the Circle Console.');
      process.exit(1);
    }

    try {
      // Generate secret
      const secret = this.generateSecret();

      // Initialize SDK
      const sdk = initiateDeveloperControlledWalletsClient({
        apiKey: this.options.apiKey,
        entitySecret: secret,
      });

      // Register ciphertext
      const recoveryFile = await this.registerCiphertext({
        apiKey: this.options.apiKey,
        entitySecret: secret,
      });

      // Prepare .env file
      this.prepareEnvFile(secret, this.options.apiKey);

      // Save recovery file
      this.saveRecoveryFile(recoveryFile);

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
