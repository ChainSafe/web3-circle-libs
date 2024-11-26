import { SecretApi } from '../../src/api/SecretApi';

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;

const baseUrl = 'https://api.circle.com/v1/w3s';

describe('Api Secret Tests', () => {
  it('Generate secret and encrypt and register', async () => {
    const secret = SecretApi.generateSecret();
    expect(secret).toBeDefined();
    const cipherText = SecretApi.getEntitySecretCiphertext(secret, publicKey);
    expect(cipherText).toBeDefined();
  });
  // works only once for each new account
  it.skip('Register entity secret ciphertext', async () => {
    const secret = SecretApi.generateSecret();
    expect(secret).toBeDefined();
    const cipherText = SecretApi.getEntitySecretCiphertext(secret, publicKey);
    expect(cipherText).toBeDefined();
    const secretApi = new SecretApi(baseUrl, apikey);
    const res = await secretApi.registerEntitySecretCiphertext(cipherText);
    expect(res.recoveryFile).toBeDefined();
    expect(res.recoveryFile.length).toBeGreaterThan(0);
  });

  it("Retrieving Your Entity's Public Key", async () => {
    const secretApi = new SecretApi(baseUrl, apikey);
    const publicKey = await secretApi.getPublicKey();
    expect(publicKey).toBeDefined();
  });
  it('Retrieving Your Config', async () => {
    const secretApi = new SecretApi(baseUrl, apikey);
    const config = await secretApi.getConfig();
    expect(config).toBeDefined();
    expect(config.appId).toBeDefined();
  });
});
