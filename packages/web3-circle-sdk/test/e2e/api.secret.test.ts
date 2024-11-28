import { SecretApi, BASE_URL } from '../../src';

const apikey = process.env.API_KEY as string;

describe('Api Secret Tests', () => {
  let publicKey = '';
  const secretApi = new SecretApi(apikey, BASE_URL);
  beforeAll(async () => {
    publicKey = await secretApi.getPublicKey();
  });
  it('Generate secret and encrypt and register', () => {
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
    const res = await secretApi.registerEntitySecretCiphertext(cipherText);
    expect(res.recoveryFile).toBeDefined();
    expect(res.recoveryFile.length).toBeGreaterThan(0);
  });

  it("Retrieving Your Entity's Public Key", async () => {
    const publicKey = await secretApi.getPublicKey();
    expect(publicKey).toBeDefined();
  });
  it('Retrieving Your Config', async () => {
    const config = await secretApi.getConfig();
    expect(config).toBeDefined();
    expect(config.appId).toBeDefined();
  });
});
