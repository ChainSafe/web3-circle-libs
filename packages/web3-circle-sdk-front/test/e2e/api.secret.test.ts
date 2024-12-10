import type { SecretApi } from '../../src';

import { signInAndGetSdk } from './fixtures/fixtures';

describe('Api Secret Tests', () => {
  let secretApi: SecretApi;
  beforeAll(async () => {
    const sdk = await signInAndGetSdk();
    secretApi = sdk.secret;
  });
  it('Retrieving Your Config', async () => {
    const config = await secretApi.getConfig();
    expect(config).toBeDefined();
    expect(config.appId).toBeDefined();
  });
});
