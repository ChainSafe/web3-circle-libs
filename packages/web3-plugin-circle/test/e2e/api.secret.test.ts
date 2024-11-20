import { SecretApi } from "../../src/api/SecretApi";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;

const baseUrl = "https://api.circle.com/v1/w3s";

describe("Api Secret Tests", () => {
  it("Generate secret and encrypt", () => {
    const secret = SecretApi.generateSecret();
    expect(secret).toBeDefined();
    const cipherText = SecretApi.getEntitySecretCiphertext(secret, publicKey);
    expect(cipherText).toBeDefined();
  });
  it("Retrieving Your Entity's Public Key", async () => {
    const secretApi = new SecretApi(baseUrl, apikey);
    const publicKey = await secretApi.getPublicKey();
    expect(publicKey).toBeDefined();
  });
  it("Retrieving Your Entity's Public Key", async () => {
    const secretApi = new SecretApi(baseUrl, apikey);
    const config = await secretApi.getConfig();
    expect(config).toBeDefined();
    expect(config.appId).toBeDefined();
  });
});
