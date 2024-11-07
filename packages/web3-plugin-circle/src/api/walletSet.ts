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
    return this.postRequest<WalletSet>(
      "/developer/walletSets",
      data,
      "walletSet",
    );
  }
  async update(params: WalletSetUpdateParameters): Promise<WalletSet> {
    return this.putRequest<WalletSet>(
      `/developer/walletSets`,
      params,
      "walletSet",
    );
  }
  async list(params?: WalletSetListParameters): Promise<WalletSet[]> {
    return this.getRequest<WalletSet[]>("/walletSets", params, "walletSets");
  }
  async get(id: string): Promise<WalletSet> {
    return this.getRequest<WalletSet>(
      `/walletSets/${id}`,
      undefined,
      "walletSet",
    );
  }
}
