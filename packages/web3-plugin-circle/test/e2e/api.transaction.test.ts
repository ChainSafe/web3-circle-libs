import { TransactionApi } from "../../src/api/TransactionApi";
import { v4 } from "uuid";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = "https://api.circle.com/v1/w3s";

describe("TransactionApi Tests", () => {
  const transactionApi = new TransactionApi(baseUrl, apikey, secret, publicKey);

  it("List Transactions", async () => {
    const res = await transactionApi.list();
    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
    const transaction = res[0];
    expect(transaction.id).toBeDefined();
    expect(transaction.blockchain).toBeDefined();
    expect(transaction.createDate).toBeDefined();
    expect(transaction.updateDate).toBeDefined();
  });

  it("Get a Transaction", async () => {
    const id = "c4d1da72-111e-4d52-bdbf-2e74a2d803d5";
    const transaction = await transactionApi.get({ id });
    expect(transaction).toBeDefined();
    expect(transaction.id).toBe(id);
    expect(transaction.blockchain).toBeDefined();
    expect(transaction.createDate).toBeDefined();
    expect(transaction.updateDate).toBeDefined();
  });

  it("Create Transfer Transaction", async () => {
    const res = await transactionApi.createTransfer({
      walletId: "8ab26468-aa26-5158-b582-9d0f42e4d40f",
      destinationAddress: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      idempotencyKey: v4(),
      amounts: ["1.0"],
      blockchain: "ETH",
    });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.state).toBeDefined();
  });

  it("Validate Address", async () => {
    const isValid = await transactionApi.validateAddress({
      blockchain: "ETH",
      address: "0x6bc50ff08414717f000431558c0b585332c2a53d",
    });
    expect(isValid).toBeDefined();
    expect(typeof isValid).toBe("boolean");
  });

  it("Estimate Contract Execution Fee", async () => {
    const res = await transactionApi.estimateContractExecutionFee({
      contractAddress: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      abiFunctionSignature: "burn(uint256)",
      abiParameters: ["100"],
      blockchain: "ETH",
      sourceAddress: "0x1bf9ad0cc2ad298c69a2995aa806ee832788218c",
    });
    expect(res).toBeDefined();
    expect(res.high).toBeDefined();
    expect(res.low).toBeDefined();
    expect(res.medium).toBeDefined();
  });

  it("Estimate Transfer Fee", async () => {
    const res = await transactionApi.estimateTransferFee({
      destinationAddress: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      amounts: ["1.0"],
      blockchain: "ETH",
    });
    expect(res).toBeDefined();
    expect(res.high).toBeDefined();
    expect(res.low).toBeDefined();
    expect(res.medium).toBeDefined();
  });

  it("Create Contract Execution Transaction", async () => {
    const res = await transactionApi.createContractExecutionTransaction({
      walletId: "8ab26468-aa26-5158-b582-9d0f42e4d40f",
      contractAddress: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      idempotencyKey: v4(),
      abiFunctionSignature: "burn(uint256)",
      abiParameters: ["100"],
      blockchain: "ETH",
    });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.state).toBeDefined();
  });

  it("Cancel Transaction", async () => {
    const id = "c4d1da72-111e-4d52-bdbf-2e74a2d803d5";
    const res = await transactionApi.cancelTransaction({ id });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.state).toBeDefined();
  });

  it("Accelerate Transaction", async () => {
    const id = "c4d1da72-111e-4d52-bdbf-2e74a2d803d5";
    const res = await transactionApi.accelerateTransaction({ id });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.state).toBeDefined();
  });
});
