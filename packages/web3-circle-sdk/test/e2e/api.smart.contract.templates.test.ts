import { BLOCKCHAIN, FEE_LEVEL, TEMPLATE, SmartContractTemplateApi } from '../../src';
import { ETH_SEPOLIA_WALLET_ADDRESS, ETH_SEPOLIA_WALLET_ID } from './fixtures/fixtures';

const apikey = process.env.API_KEY!;
const secret = process.env.SECRET!;

describe('SmartContractTemplateApi Tests', () => {
  const smartContractTemplateApi = new SmartContractTemplateApi(apikey, secret);

  it('Estimate Contract Deployment Fee', async () => {
    const params = {
      id: TEMPLATE.ERC_20,
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
      id: TEMPLATE.ERC_20,
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
    const deployResult = await smartContractTemplateApi.deploy(params);
    expect(deployResult).toBeDefined();
    expect(deployResult.contractIds).toBeDefined();
    expect(deployResult.transactionId).toBeDefined();
  });
});
