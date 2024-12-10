import { BASE_URL, BLOCKCHAIN, FaucetApi } from '../../src';

import { ETH_SEPOLIA_WALLET_ADDRESS } from './fixtures/fixtures';

const apikey = process.env.API_KEY as string;
// skipped because of rate limit
describe.skip('Faucet Api', () => {
  const faucetApi = new FaucetApi(apikey, BASE_URL);

  it('Request native token', async () => {
    const res = await faucetApi.request({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: ETH_SEPOLIA_WALLET_ADDRESS,
      native: true,
    });
    expect(res).toBe(undefined);
  });

  it('Request eurc token', async () => {
    const res = await faucetApi.request({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: ETH_SEPOLIA_WALLET_ADDRESS,
      eurc: true,
    });
    expect(res).toBe(undefined);
  });

  it('Request usdc token', async () => {
    const res = await faucetApi.request({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: ETH_SEPOLIA_WALLET_ADDRESS,
      usdc: true,
    });
    expect(res).toBe(undefined);
  });
});
