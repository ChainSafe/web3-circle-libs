import { SmartContractApi } from '../../src/api/SmartContractApi';
import { v4 } from 'uuid';
import { BLOCKCHAIN, FEE_LEVEL } from '../../src/api/constants';
import { BasicAbi, BasicBytecode } from './fixtures/Basic';
import { ETH_SEPOLIA_USDC_CONTRACT_ADDRESS, ETH_SEPOLIA_WALLET_ID } from './fixtures';

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = 'https://api.circle.com/v1/w3s';

describe('SmartContractApi Tests', () => {
  const smartContractApi = new SmartContractApi(baseUrl, apikey, secret, publicKey);

  it('List contracts', async () => {
    const contractId = '019365d4-c9ba-7705-89c5-94a32cfdbd97';
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
    };
    const contracts = await smartContractApi.list(params);
    expect(contracts).toBeDefined();
    expect(contracts.length).toBeGreaterThan(0);
    const contract = contracts.find((c) => c.name === 'USDC')!;
    expect(contract).toBeDefined();
    expect(contract.id).toBe(contractId);
    expect(contract.name).toBe('USDC');
    expect(contract.contractInputType).toBe('IMPORT');
    expect(contract.createDate).toBeDefined();
    expect(contract.updateDate).toBeDefined();
    expect(contract.archived).toBe(false);
    expect(contract.contractAddress).toBe(ETH_SEPOLIA_USDC_CONTRACT_ADDRESS);
    expect(contract.blockchain).toBe(BLOCKCHAIN.ETH_SEPOLIA);
    expect(contract.status).toBe('COMPLETE');
    expect(contract.functions).toBeDefined();
    expect(contract.events).toBeDefined();
    expect(contract.verificationStatus).toBe('UNVERIFIED');
    expect(contract.sourceCode).toBeDefined();
  });

  it('Get a contract', async () => {
    const contractId = '019365d4-c9ba-7705-89c5-94a32cfdbd97';
    const contract = await smartContractApi.get(contractId);
    expect(contract).toBeDefined();
    expect(contract.id).toBe(contractId);
    expect(contract.name).toBe('USDC');
    expect(contract.contractInputType).toBe('IMPORT');
    expect(contract.createDate).toBeDefined();
    expect(contract.updateDate).toBeDefined();
    expect(contract.archived).toBe(false);
    expect(contract.contractAddress).toBe(ETH_SEPOLIA_USDC_CONTRACT_ADDRESS);
    expect(contract.blockchain).toBe(BLOCKCHAIN.ETH_SEPOLIA);
    expect(contract.status).toBe('COMPLETE');
    expect(contract.functions).toBeDefined();
    expect(contract.events).toBeDefined();
    expect(contract.verificationStatus).toBe('UNVERIFIED');
    expect(contract.sourceCode).toBeDefined();
  });

  it('Update a contract', async () => {
    const contractId = '019365d4-c9ba-7705-89c5-94a32cfdbd97';
    const contractBefore = await smartContractApi.get(contractId);
    const params = {
      id: contractId,
      name: v4().slice(0, 6),
      description: `Updated Contract Description ${v4().slice(0, 6)}`,
      archived: true,
    };
    const updatedContract = await smartContractApi.update(params);
    expect(updatedContract).toBeDefined();
    expect(updatedContract.id).toBe(params.id);
    expect(updatedContract.name).toBe(params.name);
    expect(updatedContract.archived).toBe(params.archived);
    expect(updatedContract.description).toBe(params.description);
    await smartContractApi.update({
      id: contractId,
      name: contractBefore.name,
      description: contractBefore.description,
      archived: false,
    });
  });

  // works only once per contract
  it.skip('Import a contract', async () => {
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357',
      name: `Contract ${v4().slice(0, 6)}`,
      idempotencyKey: v4(),
    };
    const importedContract = await smartContractApi.importContract(params);
    expect(importedContract.name).toBe(params.name);
    expect(importedContract.contractInputType).toBe('IMPORT');
    expect(importedContract.createDate).toBeDefined();
    expect(importedContract.updateDate).toBeDefined();
    expect(importedContract.archived).toBe(false);
    expect(importedContract.contractAddress.toLowerCase()).toBe(
      String(params.address).toLowerCase(),
    );
    expect(importedContract.blockchain).toBe(BLOCKCHAIN.ETH_SEPOLIA);
    expect(importedContract.status).toBe('COMPLETE');
    expect(importedContract.functions).toBeDefined();
    expect(importedContract.events).toBeDefined();
    expect(importedContract.verificationStatus).toBe('UNVERIFIED');
    expect(importedContract.sourceCode).toBeDefined();
  });

  it('Estimate contract deployment fee', async () => {
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      bytecode: BasicBytecode,
      abiJson: BasicAbi,
      constructorParameters: [1, 'str'],
      sourceAddress: '0x81d3Ce1A567389F6cB1178A68EB33Aa6f081Dc52',
    };
    const feeEstimate = await smartContractApi.estimateDeployment(params);

    expect(feeEstimate).toBeDefined();
    expect(feeEstimate.low).toBeDefined();
    expect(feeEstimate.medium).toBeDefined();
    expect(feeEstimate.high).toBeDefined();
    expect(feeEstimate.low.gasLimit).toBeDefined();
    expect(feeEstimate.low.baseFee).toBeDefined();
    expect(feeEstimate.low.priorityFee).toBeDefined();
    expect(feeEstimate.low.maxFee).toBeDefined();
    expect(feeEstimate.medium.gasLimit).toBeDefined();
    expect(feeEstimate.medium.baseFee).toBeDefined();
    expect(feeEstimate.medium.priorityFee).toBeDefined();
    expect(feeEstimate.medium.maxFee).toBeDefined();
    expect(feeEstimate.high.gasLimit).toBeDefined();
    expect(feeEstimate.high.baseFee).toBeDefined();
    expect(feeEstimate.high.priorityFee).toBeDefined();
    expect(feeEstimate.high.maxFee).toBeDefined();
  });
  it('Estimate contract deployment fee with wallet id', async () => {
    const params = {
      bytecode: BasicBytecode,
      abiJson: BasicAbi,
      walletId: ETH_SEPOLIA_WALLET_ID,
      constructorParameters: [1, 'str'],
    };
    const feeEstimate = await smartContractApi.estimateDeployment(params);

    expect(feeEstimate).toBeDefined();
    expect(feeEstimate.low).toBeDefined();
    expect(feeEstimate.medium).toBeDefined();
    expect(feeEstimate.high).toBeDefined();
    expect(feeEstimate.low.gasLimit).toBeDefined();
    expect(feeEstimate.low.baseFee).toBeDefined();
    expect(feeEstimate.low.priorityFee).toBeDefined();
    expect(feeEstimate.low.maxFee).toBeDefined();
    expect(feeEstimate.medium.gasLimit).toBeDefined();
    expect(feeEstimate.medium.baseFee).toBeDefined();
    expect(feeEstimate.medium.priorityFee).toBeDefined();
    expect(feeEstimate.medium.maxFee).toBeDefined();
    expect(feeEstimate.high.gasLimit).toBeDefined();
    expect(feeEstimate.high.baseFee).toBeDefined();
    expect(feeEstimate.high.priorityFee).toBeDefined();
    expect(feeEstimate.high.maxFee).toBeDefined();
  });

  it('Deploy a contract', async () => {
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      bytecode: BasicBytecode,
      abiJson: BasicAbi,
      walletId: ETH_SEPOLIA_WALLET_ID,
      constructorParameters: [1, 'str'],
      name: `Basic`,
      idempotencyKey: v4(),
      description: 'Basic contract',
      feeLevel: FEE_LEVEL.MEDIUM,
    };
    const deployedContract = await smartContractApi.deploy(params);
    expect(deployedContract).toBeDefined();
    expect(deployedContract.contractId).toBeDefined();
    expect(deployedContract.transactionId).toBeDefined();
  });

  it('Query a contract (balanceOf)', async () => {
    // USDC contract
    const contractId = '019365d4-c9ba-7705-89c5-94a32cfdbd97';
    const contract = await smartContractApi.get(contractId);
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: contract.contractAddress,
      abiFunctionSignature: 'balanceOf(address)',
      abiParameters: ['0x1bf9ad0cc2ad298c69a2995aa806ee832788218c'],
    };
    const queryResult = await smartContractApi.query(params);
    expect(queryResult).toBeDefined();
    expect(queryResult.outputData).toBeDefined();
    expect(queryResult.outputData).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
  });
  it('Query a contract (symbol)', async () => {
    // USDC contract
    const contractId = '019365d4-c9ba-7705-89c5-94a32cfdbd97';
    const contract = await smartContractApi.get(contractId);
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: contract.contractAddress,
      abiFunctionSignature: 'symbol()',
      abiParameters: [],
    };
    const queryResult = await smartContractApi.query(params);
    expect(queryResult).toBeDefined();
    expect(queryResult.outputData).toBeDefined();
    expect(queryResult.outputData).toBe(
      '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000045553444300000000000000000000000000000000000000000000000000000000',
    );
  });
});
