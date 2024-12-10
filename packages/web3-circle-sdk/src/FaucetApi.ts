import { BaseApi } from './BaseApi';
import type { FaucetRequestParameters } from './types';

export class FaucetApi extends BaseApi {
  /**
   * Request testnet tokens for your wallet.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/request-testnet-tokens
   * @param params the parameters for the faucet request
   * @returns void
   */
  async request(params: FaucetRequestParameters): Promise<void> {
    return this.postRequest<void>('/faucet/drips', params, 'wallets');
  }
}
