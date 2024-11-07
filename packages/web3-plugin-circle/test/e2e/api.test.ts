import { WalletApi } from "../../src/api/wallet";
import { SecretApi } from "../../src/api/secret";
import { WalletSetApi } from "../../src/api/walletSet";
import { v4 } from "uuid";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = "https://api.circle.com/v1/w3s";

describe("Api Tests", () => {
  describe("Secret", () => {
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
  });
  describe("Wallet Sets", () => {
    const walletSetApi = new WalletSetApi(baseUrl, apikey, secret, publicKey);
    it("Get all wallet sets", async () => {
      const res = await walletSetApi.list();
      expect(res).toBeDefined();
      expect(res.length).toBeGreaterThan(0);
      const walletSet = res[0];
      expect(walletSet.id).toBeDefined();
      expect(walletSet.custodyType).toBeDefined();
      expect(walletSet.createDate).toBeDefined();
      expect(walletSet.updateDate).toBeDefined();
    });
    it("Get a wallet set", async () => {
      const walletSet = await walletSetApi.get(
        "c8fe6fb7-afbc-5a71-a973-7eb7ad1d5125",
      );
      expect(walletSet).toBeDefined();
      expect(walletSet.id).toBeDefined();
      expect(walletSet.custodyType).toBeDefined();
      expect(walletSet.createDate).toBeDefined();
      expect(walletSet.createDate).toBeDefined();
      expect(walletSet.name).toBeDefined();
    });
    it("Create a new wallet set", async () => {
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
    it("Update a wallet set", async () => {
      const randName = `name-${v4()}`;
      const res = await walletSetApi.update({
        id: "8ab26468-aa26-5158-b582-9d0f42e4d40f",
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
    const walletApi = new WalletApi(baseUrl, apikey, secret, publicKey);
    it("List wallets", async () => {
      const res = await walletApi.list();
      expect(res).toBeDefined();
      const wallet = res[0];
      expect(wallet.id).toBeDefined();
      expect(wallet.state).toBe("LIVE");
      expect(wallet.walletSetId).toBe("8ab26468-aa26-5158-b582-9d0f42e4d40f");
      expect(wallet.custodyType).toBe("DEVELOPER");
      expect(wallet.address).toBeDefined();
      expect(wallet.blockchain).toBe("MATIC-AMOY");
      expect(wallet.accountType).toBe("EOA");
      expect(wallet.updateDate).toBeDefined();
      expect(wallet.createDate).toBeDefined();
    });
    it("Retrieve a wallet", async () => {
      const id = "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7";
      const wallet = await walletApi.get(id);
      expect(wallet.id).toBe(id);
      expect(wallet.state).toBe("LIVE");
      expect(wallet.walletSetId).toBe("8ab26468-aa26-5158-b582-9d0f42e4d40f");
      expect(wallet.custodyType).toBe("DEVELOPER");
      expect(wallet.address).toBeDefined();
      expect(wallet.blockchain).toBe("MATIC-AMOY");
      expect(wallet.accountType).toBe("EOA");
      expect(wallet.updateDate).toBeDefined();
      expect(wallet.createDate).toBeDefined();
    });
    it("Create wallets", async () => {
      const res = await walletApi.create({
        walletSetId: "8ab26468-aa26-5158-b582-9d0f42e4d40f",
        idempotencyKey: v4(),
        blockchains: ["MATIC-AMOY"],
      });
      expect(res).toBeDefined();
      const wallet = res[0];
      expect(wallet.id).toBeDefined();
      expect(wallet.state).toBe("LIVE");
      expect(wallet.walletSetId).toBe("8ab26468-aa26-5158-b582-9d0f42e4d40f");
      expect(wallet.custodyType).toBe("DEVELOPER");
      expect(wallet.address).toBeDefined();
      expect(wallet.blockchain).toBe("MATIC-AMOY");
      expect(wallet.accountType).toBe("EOA");
      expect(wallet.updateDate).toBeDefined();
      expect(wallet.createDate).toBeDefined();
    });

    it("Update a wallet", async () => {
      const id = "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7";
      const randName = `name-${v4()}`;
      const randRefId = `refId-${v4()}`;
      const wallet = await walletApi.update({
        id,
        name: randName,
        refId: randRefId,
      });
      expect(wallet.id).toBe(id);
      expect(wallet.name).toBe(randName);
      expect(wallet.refId).toBe(randRefId);
    });

    it("Get token balance for a wallet", async () => {
      const id = "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7";
      const balances = await walletApi.balance({
        id,
      });
      expect(balances).toBeDefined();
    });
    it("Get NFTs for a wallet", async () => {
      const id = "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7";
      const nfts = await walletApi.nfts({
        id,
      });
      expect(nfts).toBeDefined();
    });
  });
});
