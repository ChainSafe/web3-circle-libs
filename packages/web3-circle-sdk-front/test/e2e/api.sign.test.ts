import type { SignApi } from '../../src';

import {
  ETH_SEPOLIA_WALLET_ID,
  EVM_TESTNET_WALLET_ID,
  signInAndGetSdk,
} from './fixtures/fixtures';

function jsonToBase64(jsonObject: object): string {
  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonObject);

  // Encode the JSON string to base64
  const base64String = btoa(jsonString);

  return base64String;
}
describe('Sign', () => {
  let signApi: SignApi;
  beforeAll(async () => {
    const sdk = await signInAndGetSdk();
    signApi = sdk.sign;
  });
  it('Sign a message', async () => {
    const message = 'Hello, World!';
    const signature = await signApi.signMessage({
      walletId: ETH_SEPOLIA_WALLET_ID,
      message,
    });
    expect(signature).toBeDefined();
  });

  it('Sign typed data', async () => {
    const data = JSON.stringify({
      types: {
        Data: [{ name: 'dummy', type: 'string' }],
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'chainId', type: 'uint256' },
        ],
      },
      domain: { name: 'Test', chainId: 11155111 },
      primaryType: 'Data',
      message: { dummy: 'dummy' },
    });
    const signature = await signApi.signTypedData({
      walletId: ETH_SEPOLIA_WALLET_ID,
      data,
      memo: 'memo text',
    });
    expect(signature.length).toBeGreaterThan(0);
    expect(signature).toBeDefined();
  });

  it('Sign a transaction', async () => {
    const signedTransaction = await signApi.signTransaction({
      walletId: EVM_TESTNET_WALLET_ID,
      transaction: JSON.stringify({
        nonce: 1,
        to: '0x1b788f3e6d600b94232e08336092ab65b896778e',
        value: '10000000000000000',
        gas: '21000',
        maxFeePerGas: '42000000000',
        maxPriorityFeePerGas: '25000000000',
        chainId: 11155111,
      }),
    });
    expect(signedTransaction).toBeDefined();
    expect(signedTransaction.signature).toBeDefined();
    expect(signedTransaction.signature.length).toBeGreaterThan(0);
    expect(signedTransaction.signedTransaction).toBeDefined();
    expect(signedTransaction.signedTransaction.length).toBeGreaterThan(0);
    expect(signedTransaction.txHash).toBeDefined();
    expect(signedTransaction.txHash.length).toBeGreaterThan(0);
  });

  // need to investigate more how NEAR blockchain works. and how create correct delegate action
  it.skip('Sign a delegate action', async () => {
    const delegateAction = {
      network: 'testnet',
      sender_id: '56c4086574a8feda65a7b3b57604aa242c0379fb8f3198413bab7d17cbf56f86',
      nonce: 0,
      actions: [
        {
          action_type: 'delegate',
          amount: '100',
          delegate_to: 'validator.node',
        },
      ],
      public_key: 'ed25519:4reiy3t8gfh45j6kl8z4rvplu6m9a9b8u0s45ty9h4v2',
      max_block_height: 5000000,
    };

    const signedDelegateAction = await signApi.signDelegateAction({
      walletId: '2a0a23f0-28e3-5fb2-ad8c-9b1483e41ecf',
      unsignedDelegateAction: jsonToBase64(delegateAction),
    });
    expect(signedDelegateAction).toBeDefined();
    expect(signedDelegateAction.signature).toBeDefined();
    expect(signedDelegateAction.signedDelegateAction).toBeDefined();
  });
});
