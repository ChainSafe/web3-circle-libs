import type { FaucetApi } from '../../src';
import { BLOCKCHAIN } from '../../src';

import { ETH_SEPOLIA_WALLET_ADDRESS, signInAndGetSdk } from './fixtures/fixtures';

// skip because of rate limit
describe.skip('Faucet Api', () => {
  let faucetApi: FaucetApi;
  beforeAll(async () => {
    const sdk = await signInAndGetSdk();
    faucetApi = sdk.faucet;
  });

  it('Request native token', async () => {
    const res = await faucetApi.request({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: ETH_SEPOLIA_WALLET_ADDRESS,
      native: true,
    });
    expect(res).toBe(true);
  });

  it('Request eurc token', async () => {
    const res = await faucetApi.request({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: ETH_SEPOLIA_WALLET_ADDRESS,
      eurc: true,
    });
    expect(res).toBe(true);
  });

  it('Request usdc token', async () => {
    const res = await faucetApi.request({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: ETH_SEPOLIA_WALLET_ADDRESS,
      usdc: true,
    });
    expect(res).toBe(true);
  });
});
