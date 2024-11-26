import { SecretApi } from '../../../packages/web3-circle-sdk';
import { sdk } from './_sdk';

// Generate a random 32-byte value that you will use to generate a cipher texts
const secret = SecretApi.generateSecret();

console.log('Secret: ', secret);

// Fetch appId for your API Key
const config = await sdk.secret.getConfig();

console.log('Config: ', config);

// Fetch public key for your API Key
const publicKey = await sdk.secret.getPublicKey();

console.log('Public Key: ', publicKey);

const cipherText = SecretApi.getEntitySecretCiphertext(secret, publicKey);

console.log('CipherText: ', cipherText);

// Only once! Register entity secret ciphertext and return the recovery file
const registration = await sdk.secret.registerEntitySecretCiphertext(cipherText);

console.log('Registration: ', registration);
