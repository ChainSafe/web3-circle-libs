import { BaseApi } from './BaseApi';
import {
  GetMonitoredTokensParameters,
  MonitoredTokenEntity,
  MonitoredTokensParameters,
  UpdateMonitoredTokensScopeParameters,
} from './types';

export class MonitoredTokensApi extends BaseApi {
  /**
   * Adds new tokens to the monitored tokens list.
   * When fetching wallet balances, only these tokens will be shown by default.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/create-monitored-tokens
   * @param params the parameters for the set monitored tokens request
   * @returns the new monitored tokens
   */
  async set(params: MonitoredTokensParameters): Promise<MonitoredTokenEntity> {
    return this.postRequest<MonitoredTokenEntity>(
      '/w3s/config/entity/monitoredTokens',
      params,
    );
  }

  /**
   * Updates the scope of monitored tokens to either monitor all tokens or only selected tokens.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/update-monitored-tokens
   * @param params the parameters for the update monitored tokens request
   * @returns the updated monitored tokens
   */
  async update(params: MonitoredTokensParameters): Promise<MonitoredTokenEntity> {
    return this.putRequest<MonitoredTokenEntity>(
      '/w3s/config/entity/monitoredTokens',
      params,
    );
  }

  /**
   * Retrieves the list of monitored tokens.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/list-monitored-tokens
   * @param params the parameters for the get monitored tokens request
   * @returns the monitored tokens
   */
  async get(params?: GetMonitoredTokensParameters): Promise<MonitoredTokenEntity> {
    return this.getRequest<MonitoredTokenEntity>(
      '/w3s/config/entity/monitoredTokens',
      params,
    );
  }

  /**
   * Delete monitored tokens
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/delete-monitored-tokens
   * @param params the parameters for the delete monitored token request
   * @returns a boolean that indicates if the monitored tokens were deleted
   */
  async delete(params: MonitoredTokensParameters): Promise<boolean> {
    return (
      (await this.postRequest<undefined>(
        '/w3s/config/entity/monitoredTokens/delete',
        params,
      )) === undefined
    );
  }

  /**
   * Update monitored tokens scope
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/update-monitored-tokens-scope
   * @param params the parameters for the update monitored tokens scope request
   * @returns a boolean that indicates if the scope of the monitored tokens was updated
   */
  async updateScope(params: UpdateMonitoredTokensScopeParameters): Promise<boolean> {
    return (
      (await this.putRequest<undefined>(
        '/w3s/config/entity/monitoredTokens/scope',
        params,
      )) === undefined
    );
  }
}
