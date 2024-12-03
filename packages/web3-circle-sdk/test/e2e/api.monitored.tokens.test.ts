import { BLOCKCHAIN, MONITORED_TOKENS_SCOPE, MonitoredTokensApi } from '../../src';

import { ETH_SEPOLIA_EURC_TOKEN_ID } from './fixtures/fixtures';

const apikey = process.env.API_KEY as string;
describe('Monitored tokens Api', () => {
  const monitoredTokensApi = new MonitoredTokensApi(apikey);

  it('Set', async () => {
    const res = await monitoredTokensApi.set({
      tokenIds: [ETH_SEPOLIA_EURC_TOKEN_ID],
    });
    expect(res.scope).toBeDefined();
    expect(res.tokens).toBeDefined();
    const token = res.tokens[0];
    expect(token.blockchain).toBeDefined();
    expect(token.createDate).toBeDefined();
    expect(token.decimals).toBeDefined();
    expect(token.id).toBeDefined();
    expect(token.isNative).toBeDefined();
    expect(token.name).toBeDefined();
    expect(token.standard).toBeDefined();
    expect(token.symbol).toBeDefined();
    expect(token.tokenAddress).toBeDefined();
    expect(token.updateDate).toBeDefined();
  });

  it('Get', async () => {
    const res = await monitoredTokensApi.get();
    expect(res.scope).toBeDefined();
    expect(res.tokens).toBeDefined();
    const token = res.tokens[0];
    expect(token.blockchain).toBeDefined();
    expect(token.createDate).toBeDefined();
    expect(token.decimals).toBeDefined();
    expect(token.id).toBeDefined();
    expect(token.isNative).toBeDefined();
    expect(token.name).toBeDefined();
    expect(token.standard).toBeDefined();
    expect(token.symbol).toBeDefined();
    expect(token.tokenAddress).toBeDefined();
    expect(token.updateDate).toBeDefined();
  });

  it('Update', async () => {
    const clear = await monitoredTokensApi.update({
      tokenIds: [],
    });
    expect(clear.scope).toBeDefined();
    expect(clear.tokens).toBeDefined();
    expect(clear.tokens.length).toBe(0);
    const res = await monitoredTokensApi.update({
      tokenIds: [ETH_SEPOLIA_EURC_TOKEN_ID],
    });
    expect(res.scope).toBeDefined();
    expect(res.tokens).toBeDefined();
    const token = res.tokens[0];
    expect(token.blockchain).toBeDefined();
    expect(token.createDate).toBeDefined();
    expect(token.decimals).toBeDefined();
    expect(token.id).toBeDefined();
    expect(token.isNative).toBeDefined();
    expect(token.name).toBeDefined();
    expect(token.standard).toBeDefined();
    expect(token.symbol).toBeDefined();
    expect(token.tokenAddress).toBeDefined();
    expect(token.updateDate).toBeDefined();
  });

  it('Delete', async () => {
    const deleteRes = await monitoredTokensApi.delete({
      tokenIds: [ETH_SEPOLIA_EURC_TOKEN_ID],
    });
    expect(deleteRes).toBe(true);
    const resAfterDeleted = await monitoredTokensApi.get({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
    });
    expect(resAfterDeleted.scope).toBeDefined();
    expect(resAfterDeleted.tokens).toBeDefined();
    expect(resAfterDeleted.tokens.length).toBe(0);
    const res = await monitoredTokensApi.update({
      tokenIds: [ETH_SEPOLIA_EURC_TOKEN_ID],
    });
    expect(res.scope).toBeDefined();
    expect(res.tokens.length).toBe(1);
  });

  it('Update scope', async () => {
    const res = await monitoredTokensApi.updateScope({
      scope: MONITORED_TOKENS_SCOPE.MONITOR_ALL,
    });
    expect(res).toBe(true);
    const monitoredAll = await monitoredTokensApi.get();
    expect(monitoredAll.scope).toBe(MONITORED_TOKENS_SCOPE.MONITOR_ALL);
    await monitoredTokensApi.updateScope({
      scope: MONITORED_TOKENS_SCOPE.SELECTED,
    });
    const monitoredSelected = await monitoredTokensApi.get();
    expect(monitoredSelected.scope).toBe(MONITORED_TOKENS_SCOPE.SELECTED);
  });
});
