import { SmartContractApi } from "../../src/api/SmartContractApi";
import { v4 } from "uuid";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = "https://api.circle.com/v1/w3s";

describe("SmartContractApi Tests", () => {
  const smartContractApi = new SmartContractApi(
    baseUrl,
    apikey,
    secret,
    publicKey,
  );

  it("List contracts", async () => {
    const params = {
      blockchain: "ETH",
      from: "2023-01-01T12:00:00Z",
      to: "2023-12-31T12:00:00Z",
    };
    const contracts = await smartContractApi.list(params);
    expect(contracts).toBeDefined();
    expect(contracts.length).toBeGreaterThan(0);
    expect(contracts[0].id).toBeDefined();
  });

  it("Get a contract", async () => {
    const contractId = "c4d1da72-111e-4d52-bdbf-2e74a2d803d5";
    const contract = await smartContractApi.get(contractId);
    expect(contract).toBeDefined();
    expect(contract.id).toBe(contractId);
    expect(contract.blockchain).toBeDefined();
  });

  it("Update a contract", async () => {
    const params = {
      id: "c4d1da72-111e-4d52-bdbf-2e74a2d803d5",
      name: "Updated Contract Name",
      description: "Updated Contract Description",
    };
    const updatedContract = await smartContractApi.update(params);
    expect(updatedContract).toBeDefined();
    expect(updatedContract.id).toBe(params.id);
    expect(updatedContract.name).toBe(params.name);
    expect(updatedContract.description).toBe(params.description);
  });

  it("Import a contract", async () => {
    const params = {
      blockchain: "ETH",
      address: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      name: `ImportedContract-${v4()}`,
      idempotencyKey: v4(),
    };
    const importedContract = await smartContractApi.importContract(params);
    expect(importedContract).toBeDefined();
    expect(importedContract.id).toBeDefined();
    expect(importedContract.name).toBe(params.name);
  });

  it("Estimate contract deployment fee", async () => {
    const params = {
      blockchain: "ETH",
      bytecode: "0x60806040523480156200001157600080fd5b50604051806040...",
    };
    const feeEstimate = await smartContractApi.estimateDeployment(params);
    expect(feeEstimate).toBeDefined();
    expect(feeEstimate.high).toBeDefined();
    expect(feeEstimate.medium).toBeDefined();
    expect(feeEstimate.low).toBeDefined();
  });

  it("Deploy a contract", async () => {
    const params = {
      blockchain: "ETH",
      entitySecretCiphertext: "base64-ciphertext",
      bytecode: "0x60806040523480156200001157600080fd5b50604051806040...",
      abiJson:
        '[{"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}]',
      walletId: "d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7",
      name: `DeployedContract-${v4()}`,
      idempotencyKey: v4(),
    };
    const deployedContract = await smartContractApi.deploy(params);
    expect(deployedContract).toBeDefined();
    expect(deployedContract.contractId).toBeDefined();
    expect(deployedContract.transactionId).toBeDefined();
  });

  it("Query a contract", async () => {
    const params = {
      blockchain: "ETH",
      address: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      abiFunctionSignature: "balanceOf(address)",
      abiParameters: ["0x1bf9ad0cc2ad298c69a2995aa806ee832788218c"],
    };
    const queryResult = await smartContractApi.query(params);
    expect(queryResult).toBeDefined();
    expect(queryResult.outputData).toBeDefined();
  });
});
