import { TokenLookupApi } from '../../src/api/TokenLookupApi';
import { ETH_SEPOLIA_EURC_TOKEN_ID } from './fixtures';

const apikey = process.env.API_KEY as string;
const baseUrl = 'https://api.circle.com/v1/w3s';

describe('TokenLookupApi Tests', () => {
  const tokenLookupApi = new TokenLookupApi(baseUrl, apikey);

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
