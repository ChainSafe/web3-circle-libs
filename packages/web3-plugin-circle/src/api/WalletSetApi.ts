import {
  DeveloperFields,
  WalletSet,
  WalletSetCreateParameters,
  WalletSetListParameters,
  WalletSetUpdateParameters,
} from "./types";
import { v4 } from "uuid";
import { DeveloperApi } from "./DeveloperApi";

export class WalletSetApi extends DeveloperApi {
  /**
   * Create a developer controlled wallet set.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set
   * @param params the parameters for the create wallet set request
   * @returns the new wallet set
   */
  async create(params: WalletSetCreateParameters): Promise<WalletSet> {
    const data: WalletSetCreateParameters & DeveloperFields = {
      entitySecretCiphertext: this.generateCipherText(),
      idempotencyKey: params.idempotencyKey ?? v4(),
    };
    if (params.name) {
      data.name = params.name;
    }
    return this.postRequest<WalletSet>(
      "/developer/walletSets",
      data,
      "walletSet",
    );
  }

  /**
   * Update the name of the wallet set
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set
   * @param params the parameters for the update wallet set request
   * @returns the updated wallet set
   */
  async update(params: WalletSetUpdateParameters): Promise<WalletSet> {
    return this.putRequest<WalletSet>(
      `/developer/walletSets`,
      params,
      "walletSet",
    );
  }

  /**
   * Retrieve an array of existing wallet sets.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets
   * @param params the parameters for the list wallet sets request
   * @returns the list of wallet sets
   */
  async list(params?: WalletSetListParameters): Promise<WalletSet[]> {
    return this.getRequest<WalletSet[]>("/walletSets", params, "walletSets");
  }

  /**
   * Retrieve an existing wallet set.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-set
   * @param id the ID of the wallet set
   * @returns the requested wallet set
   */
  async get(id: string): Promise<WalletSet> {
    return this.getRequest<WalletSet>(
      `/walletSets/${id}`,
      undefined,
      "walletSet",
    );
  }
}
