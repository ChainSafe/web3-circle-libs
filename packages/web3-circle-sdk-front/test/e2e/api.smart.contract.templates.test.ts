import type { SmartContractTemplateApi } from '../../src';
import { BLOCKCHAIN, FEE_LEVEL, TEMPLATE } from '../../src';

import {
  ETH_SEPOLIA_WALLET_ADDRESS,
  ETH_SEPOLIA_WALLET_ID,
  signInAndGetSdk,
} from './fixtures/fixtures';

describe('SmartContractTemplateApi Tests', () => {
  let smartContractTemplateApi: SmartContractTemplateApi;
  beforeAll(async () => {
    const sdk = await signInAndGetSdk();
    smartContractTemplateApi = sdk.smartContractTemplate;
  });
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
