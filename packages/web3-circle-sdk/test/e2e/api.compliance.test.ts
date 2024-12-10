import { BASE_URL, CHAIN, ComplianceApi, SCREENING_RESULT } from '../../src';

import { ETH_SEPOLIA_WALLET_ADDRESS } from './fixtures/fixtures';

const apikey = process.env.API_KEY as string;
describe('Faucet Api', () => {
  const complianceApi = new ComplianceApi(apikey, BASE_URL);

  it('Request native token', async () => {
    const res = await complianceApi.screenAddress({
      chain: CHAIN.ETH_SEPOLIA,
      address: ETH_SEPOLIA_WALLET_ADDRESS,
    });
    // Validate address
    expect(res.address).toBe(ETH_SEPOLIA_WALLET_ADDRESS);

    // Validate chain
    expect(res.chain).toBe(CHAIN.ETH_SEPOLIA);

    // Validate decision
    expect(res.decision).toHaveProperty('screeningDate');

    // Validate details
    expect(Array.isArray(res.details)).toBe(true);
    expect(res.details).toHaveLength(0);

    // Validate id
    expect(res.id).toBeDefined();

    // Validate result
    expect(res.result).toBe(SCREENING_RESULT.APPROVED);
  });
});
