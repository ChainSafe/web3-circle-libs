import { SmartContractTemplateApi } from '../../src/api/SmartContractTemplateApi';
import { ETH_SEPOLIA_WALLET_ADDRESS, ETH_SEPOLIA_WALLET_ID } from './fixtures';
import { BLOCKCHAIN, FEE_LEVEL } from '../../src/api/constants';

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = 'https://api.circle.com/v1/w3s';

describe('SmartContractTemplateApi Tests', () => {
  const smartContractTemplateApi = new SmartContractTemplateApi(
    baseUrl,
    apikey,
    secret,
    publicKey,
  );

  it('Estimate Contract Deployment Fee', async () => {
    const params = {
      id: 'a1b74add-23e0-4712-88d1-6b3009e85a86',
      walletId: ETH_SEPOLIA_WALLET_ID,
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      templateParameters: {
        name: 'TTK',
        defaultAdmin: ETH_SEPOLIA_WALLET_ADDRESS,
        primarySaleRecipient: ETH_SEPOLIA_WALLET_ADDRESS,
      },
    };
    const estimateFee = await smartContractTemplateApi.estimateDeploymentFee(params);
    expect(estimateFee).toBeDefined();
    expect(estimateFee.high).toBeDefined();
    expect(estimateFee.low).toBeDefined();
    expect(estimateFee.medium).toBeDefined();
  });

  it('Deploy Contract from Template', async () => {
    const params = {
      id: 'a1b74add-23e0-4712-88d1-6b3009e85a86',
      walletId: ETH_SEPOLIA_WALLET_ID,
      name: 'TTK',
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      templateParameters: {
        name: 'TTK',
        defaultAdmin: ETH_SEPOLIA_WALLET_ADDRESS,
        primarySaleRecipient: ETH_SEPOLIA_WALLET_ADDRESS,
      },
      feeLevel: FEE_LEVEL.MEDIUM,
    };
    const deployResult = await smartContractTemplateApi.deployContract(params);
    expect(deployResult).toBeDefined();
    expect(deployResult.contractIds).toBeDefined();
    expect(deployResult.transactionId).toBeDefined();
  });
});
