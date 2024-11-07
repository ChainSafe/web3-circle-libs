import { SmartContractTemplateApi } from "../../src/api/SmartContractTemplateApi";
import { v4 } from "uuid";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = "https://api.circle.com/v1/w3s";

describe("SmartContractTemplateApi Tests", () => {
  const smartContractTemplateApi = new SmartContractTemplateApi(
    baseUrl,
    apikey,
    secret,
    publicKey,
  );

  it("Estimate Contract Deployment Fee", async () => {
    const params = {
      id: "template-id",
      blockchain: "ETH",
      sourceAddress: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      templateParameters: {
        param1: "value1",
      },
    };
    const estimateFee =
      await smartContractTemplateApi.estimateDeploymentFee(params);
    expect(estimateFee).toBeDefined();
    expect(estimateFee.high).toBeDefined();
    expect(estimateFee.low).toBeDefined();
    expect(estimateFee.medium).toBeDefined();
  });

  it("Deploy Contract from Template", async () => {
    const params = {
      id: "template-id",
      entitySecretCiphertext: "encryptedSecret",
      name: "MyContract",
      walletId: "wallet-id",
      blockchain: "ETH",
      idempotencyKey: v4(),
      description: "Deploying my first contract",
      templateParameters: {
        param1: "value1",
      },
      feeLevel: "MEDIUM",
    };
    const deployResult = await smartContractTemplateApi.deployContract(params);
    expect(deployResult).toBeDefined();
    expect(deployResult.contractIds).toBeDefined();
    expect(deployResult.transactionId).toBeDefined();
  });
});
