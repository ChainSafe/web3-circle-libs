import { v4 } from 'uuid';

import { signInAndGetSdk } from './fixtures/fixtures';
import { WalletSetApi } from '../../src';

describe('Wallet Sets', () => {
  let walletSetApi: WalletSetApi;
  beforeAll(async () => {
    const sdk = await signInAndGetSdk();
    walletSetApi = sdk.walletSet;
  });

  it('Get all wallet sets', async () => {
    const res = await walletSetApi.list();
    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
    const walletSet = res[0];
    expect(walletSet.id).toBeDefined();
    expect(walletSet.custodyType).toBeDefined();
    expect(walletSet.createDate).toBeDefined();
    expect(walletSet.updateDate).toBeDefined();
  });
  it('Get a wallet set', async () => {
    const walletSet = await walletSetApi.get('c8fe6fb7-afbc-5a71-a973-7eb7ad1d5125');
    expect(walletSet).toBeDefined();
    expect(walletSet.id).toBeDefined();
    expect(walletSet.custodyType).toBeDefined();
    expect(walletSet.createDate).toBeDefined();
    expect(walletSet.createDate).toBeDefined();
    expect(walletSet.name).toBeDefined();
  });
  it('Create a new wallet set', async () => {
    const randName = `name-${v4()}`;
    const res = await walletSetApi.create({
      idempotencyKey: v4(),
      name: randName,
    });
    expect(res.id).toBeDefined();
    expect(res.custodyType).toBeDefined();
    expect(res.createDate).toBeDefined();
    expect(res.updateDate).toBeDefined();
    expect(res.name).toBe(randName);
  });
  it('Update a wallet set', async () => {
    const randName = `name-${v4()}`;
    const res = await walletSetApi.update({
      id: '8ab26468-aa26-5158-b582-9d0f42e4d40f',
      name: randName,
    });
    expect(res.id).toBeDefined();
    expect(res.custodyType).toBeDefined();
    expect(res.createDate).toBeDefined();
    expect(res.updateDate).toBeDefined();
    expect(res.name).toBe(randName);
  });
});
