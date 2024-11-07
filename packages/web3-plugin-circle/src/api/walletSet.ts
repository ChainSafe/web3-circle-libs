import {
  DeveloperFields,
  WalletSet,
  WalletSetCreateParameters,
  WalletSetListParameters,
  WalletSetUpdateParameters,
} from "./types";
import { v4 } from "uuid";
import { DeveloperApi } from "./baseDeveloperApi";

export class WalletSetApi extends DeveloperApi {
  async create(params: WalletSetCreateParameters): Promise<WalletSet> {
    const data: WalletSetCreateParameters & DeveloperFields = {
      entitySecretCiphertext: this.generateCipherText(),
      idempotencyKey: params.idempotencyKey ?? v4(),
    };
    if (params.name) {
      data.name = params.name;
    }
    return this.postRequest<
      WalletSetCreateParameters & DeveloperFields,
      WalletSet
    >("/developer/walletSets", data, "walletSet");
  }
  async update(params: WalletSetUpdateParameters): Promise<WalletSet> {
    return this.putRequest<WalletSetUpdateParameters, WalletSet>(
      `/developer/walletSets`,
      params,
      "walletSet",
    );
  }
  async list(params?: WalletSetListParameters): Promise<WalletSet[]> {
    return this.getRequest<WalletSetListParameters, WalletSet[]>(
      "/walletSets",
      params,
      "walletSets",
    );
  }
  async get(id: string): Promise<WalletSet> {
    return this.getRequest<never, WalletSet>(
      `/walletSets/${id}`,
      undefined,
      "walletSet",
    );
  }
}
