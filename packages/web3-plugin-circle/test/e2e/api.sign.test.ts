import { SignApi } from "../../src/api/SignApi";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = "https://api.circle.com/v1/w3s";

describe("Api Tests", () => {
  describe("Sign", () => {
    const signApi = new SignApi(baseUrl, apikey, secret, publicKey);

    it("Sign a message", async () => {
      const message = "Hello, World!";
      const signature = await signApi.signMessage({
        walletId: "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7",
        message,
      });
      expect(signature).toBeDefined();
    });

    it.only("Sign typed data", async () => {
      const data =
        '{ "types": { "Data": [{ "name": "dummy", "type": "string" }],"EIP712Domain":[{ "name": "name", "type": "string" },{ "name": "chainId", "type": "uint256" }]}, "domain": { "name": "Test", "chainId": 1337 }, "primaryType": "Data", "message": { "dummy": "dummy" }}';
      const signature = await signApi.signTypedData({
        walletId: "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7",
        data,
        memo: "memo text",
      });
      console.log(signature);
      expect(signature).toBeDefined();
    });

    it("Sign a transaction", async () => {
      const signedTransaction = await signApi.signTransaction({
        walletId: "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7",
        rawTransaction: "0xabcdef123456",
      });
      expect(signedTransaction).toBeDefined();
      expect(signedTransaction.signedTransaction).toBeDefined();
      expect(signedTransaction.txHash).toBeDefined();
    });

    it("Sign a delegate action", async () => {
      const signedDelegateAction = await signApi.signDelegateAction({
        walletId: "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7",
        unsignedDelegateAction: "0xabcdef123456",
      });
      expect(signedDelegateAction).toBeDefined();
      expect(signedDelegateAction.signature).toBeDefined();
      expect(signedDelegateAction.signedDelegateAction).toBeDefined();
    });
  });
});
