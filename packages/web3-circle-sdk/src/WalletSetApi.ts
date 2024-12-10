import { DeveloperApi } from './DeveloperApi';
import type {
  WalletSet,
  WalletSetCreateParameters,
  WalletSetListParameters,
  WalletSetUpdateParameters,
} from './types';

export class WalletSetApi extends DeveloperApi {
  /**
   * Create a developer controlled wallet set.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set
   * @param params the parameters for the create wallet set request
   * @returns the new wallet set
   */
  async create(params: WalletSetCreateParameters): Promise<WalletSet> {
    const data: WalletSetCreateParameters =
      await this.addCipherTextAndIdempotencyKeyToParams<WalletSetCreateParameters>(
        params,
      );
    if (params.name) {
      data.name = params.name;
    }
    return this.postRequest<WalletSet>('/w3s/developer/walletSets', data, 'walletSet');
  }

  /**
   * Update the name of the wallet set
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set
   * @param params the parameters for the update wallet set request
   * @returns the updated wallet set
   */
  async update(params: WalletSetUpdateParameters): Promise<WalletSet> {
    return this.putRequest<WalletSet>(`/w3s/developer/walletSets`, params, 'walletSet');
  }

  /**
   * Retrieve an array of existing wallet sets.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets
   * @param params the parameters for the list wallet sets request
   * @returns the list of wallet sets
   */
  async list(params?: WalletSetListParameters): Promise<WalletSet[]> {
    return this.getRequest<WalletSet[]>('/w3s/walletSets', params, 'walletSets');
  }

  /**
   * Retrieve an existing wallet set.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-set
   * @param id the ID of the wallet set
   * @returns the requested wallet set
   */
  async get(id: string): Promise<WalletSet> {
    return this.getRequest<WalletSet>(`/w3s/walletSets/${id}`, undefined, 'walletSet');
  }
}
