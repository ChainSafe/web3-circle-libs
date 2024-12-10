import type { TokenLookupApi } from '../../src';

import { ETH_SEPOLIA_EURC_TOKEN_ID, signInAndGetSdk } from './fixtures/fixtures';

describe('TokenLookupApi Tests', () => {
  let tokenLookupApi: TokenLookupApi;
  beforeAll(async () => {
    const sdk = await signInAndGetSdk();
    tokenLookupApi = sdk.tokenLookup;
  });

  it('Get Token by ID', async () => {
    const tokenId = ETH_SEPOLIA_EURC_TOKEN_ID;
    const token = await tokenLookupApi.get(tokenId);
    expect(token).toBeDefined();
    expect(token.id).toBe(tokenId);
    expect(token.name).toBeDefined();
    expect(token.standard).toBeDefined();
    expect(token.blockchain).toBeDefined();
    expect(token.decimals).toBeDefined();
    expect(token.isNative).toBeDefined();
    expect(token.symbol).toBeDefined();
    expect(token.tokenAddress).toBeDefined();
    expect(token.updateDate).toBeDefined();
    expect(token.createDate).toBeDefined();
  });
});
