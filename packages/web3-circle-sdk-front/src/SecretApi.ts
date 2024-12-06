import { BaseApi } from './BaseApi';
import type { ConfigEntity } from './types';

export class SecretApi extends BaseApi {
  /**
   * Get an entity's configuration from the Circle REST API
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/get-entity-config
   * @returns the entity's configuration
   */
  async getConfig(): Promise<ConfigEntity> {
    return this.execute<ConfigEntity>('secret', 'getConfig');
  }
}
