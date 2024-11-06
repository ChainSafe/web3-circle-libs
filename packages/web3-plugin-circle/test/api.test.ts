import { WalletApi } from "../src/api/wallet";
import { SecretApi } from "../src/api/secret";
import { WalletSetApi } from "../src/api/walletSet";
import { v4 } from "uuid";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

describe("Api Tests", () => {
  describe("Secret", () => {
    it("Generate secret and encrypt", () => {
      const secret = SecretApi.generateSecret();
      expect(secret).toBeDefined();
      const cipherText = SecretApi.getEntitySecretCiphertext(secret, publicKey);
      expect(cipherText).toBeDefined();
    });
    it("Retrieving Your Entity's Public Key", async () => {
      const secretApi = new SecretApi("https://api.circle.com/v1/w3s", apikey);
      const publicKey = await secretApi.getPublicKey();
      expect(publicKey).toBeDefined();
    });
  });
  describe("Wallet Sets", () => {
    const walletSetApi = new WalletSetApi(
      "https://api.circle.com/v1/w3s",
      apikey,
      secret,
      publicKey,
    );
    it("list", async () => {
      const res = await walletSetApi.list();
      expect(res).toBeDefined();
      expect(res.length).toBeGreaterThan(0);
      const walletSet = res[0];
      expect(walletSet.id).toBeDefined();
      expect(walletSet.custodyType).toBeDefined();
      expect(walletSet.createDate).toBeDefined();
      expect(walletSet.updateDate).toBeDefined();
    });
    it("get", async () => {
      const walletSet = await walletSetApi.get(
        "c8fe6fb7-afbc-5a71-a973-7eb7ad1d5125",
      );
      console.log("res", walletSet);
      expect(walletSet).toBeDefined();
      expect(walletSet.id).toBeDefined();
      expect(walletSet.custodyType).toBeDefined();
      expect(walletSet.createDate).toBeDefined();
      expect(walletSet.createDate).toBeDefined();
      expect(walletSet.name).toBeDefined();
    });
    it("create", async () => {
      const randName = `name-${v4()}`;
      const res = await walletSetApi.create({
        idempotencyKey: v4(),
        name: randName,
      });
      expect(res.id).toBeDefined();
      expect(res.custodyType).toBeDefined();
      expect(res.createDate).toBeDefined();
      expect(res.updateDate).toBeDefined();
      expect(res.name).toBe(randName);
    });
    it("update", async () => {
      const randName = `name-${v4()}`;
      const res = await walletSetApi.create({
        idempotencyKey: v4(),
        name: randName,
      });
      expect(res.id).toBeDefined();
      expect(res.custodyType).toBeDefined();
      expect(res.createDate).toBeDefined();
      expect(res.updateDate).toBeDefined();
      expect(res.name).toBe(randName);
    });
  });
  describe("Wallet", () => {
    const walletApi = new WalletApi("https://api.circle.com/v1/w3s", apikey);
    it("list", async () => {
      const res = await walletApi.list();
      expect(res).toBeDefined();
    });
    // it("create", async () => {
    //   const res = await walletApi.create({
    //     idempotencyKey: v4(),
    //   });
    //   console.log("res", res);
    //   expect(res).toBeDefined();
    // });
  });
});
