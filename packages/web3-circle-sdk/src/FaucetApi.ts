import { BaseApi } from './BaseApi';
import type { FaucetRequestParameters } from './types';

export class FaucetApi extends BaseApi {
  /**
   * Request testnet tokens for your wallet.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/request-testnet-tokens
   * @param params the parameters for the faucet request
   * @returns a boolean that indicates if the faucet request was successful
   */
  async request(params: FaucetRequestParameters): Promise<boolean> {
    return (
      (await this.postRequest<void>('/faucet/drips', params, 'wallets')) === undefined
    );
  }
}
