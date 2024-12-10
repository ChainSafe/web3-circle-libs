import { BaseApi } from './BaseApi';
import type { FaucetRequestParameters } from './types';

export class FaucetApi extends BaseApi {
  /**
   * Request testnet tokens for your wallet.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/request-testnet-tokens
   * @param params the parameters for the faucet request
   * @returns boolean
   */
  async request(params: FaucetRequestParameters): Promise<boolean> {
    return this.execute<boolean>('faucet', 'request', params);
  }
}
