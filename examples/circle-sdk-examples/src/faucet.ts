import { BLOCKCHAIN, CircleSdk } from 'web3-circle-sdk';
import { apiKey, secret } from './_sdk';

export const sdk = new CircleSdk(apiKey, secret);

try {
  await sdk.faucet.request({
    blockchain: BLOCKCHAIN.MATIC_AMOY,
    address: '0xf6c9efc84080217ccd13ef6d4a7f26a680f2c713',
    native: true,
    usdc: true,
  });
} catch (e) {
  console.error(e);
}
