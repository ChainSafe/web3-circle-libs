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
   * @param params List of token IDs to add to the monitored tokens list.
   */
  async set(params: MonitoredTokensParameters): Promise<MonitoredTokenEntity> {
    return this.execute<MonitoredTokenEntity>('monitoredTokens', 'set', params);
  }

  /**
   * Updates the scope of monitored tokens to either monitor all tokens or only selected tokens.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/update-monitored-tokens
   * @param params Scope for monitoring tokens.
   */
  async update(params: MonitoredTokensParameters): Promise<MonitoredTokenEntity> {
    return this.execute<MonitoredTokenEntity>('monitoredTokens', 'update', params);
  }

  /**
   * Retrieves the list of monitored tokens.
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/list-monitored-tokens
   * @returns List of monitored token IDs.
   */
  async get(params?: GetMonitoredTokensParameters): Promise<MonitoredTokenEntity> {
    return this.execute<MonitoredTokenEntity>('monitoredTokens', 'get', params);
  }

  /**
   * Delete monitored tokens
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/delete-monitored-tokens
   * @returns boolean
   */
  async delete(params: MonitoredTokensParameters): Promise<boolean> {
    return this.execute<boolean>('monitoredTokens', 'delete', params);
  }

  /**
   * Update monitored tokens scope
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/update-monitored-tokens-scope
   * @returns boolean
   */
  async updateScope(params: UpdateMonitoredTokensScopeParameters): Promise<boolean> {
    return this.execute<boolean>('monitoredTokens', 'updateScope', params);
  }
}
