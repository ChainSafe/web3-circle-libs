import { Api } from "./base";
import {
  WalletSet,
  WalletSetCreateParameters,
  WalletSetListParameters,
  WalletSetUpdateParameters,
} from "./types";
import { v4 } from "uuid";
import { SecretApi } from "./secret";

export class WalletSetApi extends Api {
  private secret?: string;
  private publicKey?: string;
  constructor(
    baseUrl: string,
    apiKey: string,
    secret?: string,
    publicKey?: string,
  ) {
    super(baseUrl, apiKey);
    this.secret = secret;
    this.publicKey = publicKey;
  }
  async create(params: WalletSetCreateParameters): Promise<WalletSet> {
    if (!this.secret || !this.publicKey) {
      throw new Error("Secret and public key are not set");
    }
    const data: WalletSetCreateParameters = {
      entitySecretCiphertext: SecretApi.getEntitySecretCiphertext(
        this.secret,
        this.publicKey,
      ),
      idempotencyKey: params.idempotencyKey ?? v4(),
    };
    if (params.name) {
      data.name = params.name;
    }
    const result = await this.postRequest<
      WalletSetCreateParameters,
      { walletSet: WalletSet }
    >("/developer/walletSets", data);
    return result.walletSet;
  }
  async update(params: WalletSetUpdateParameters): Promise<WalletSet> {
    const { id, name } = params;
    const result = await this.putRequest<
      Omit<WalletSetUpdateParameters, "id">,
      { walletSet: WalletSet }
    >(`/developer/walletSets${id}`, {
      name,
    });
    return result.walletSet;
  }
  async list(params?: WalletSetListParameters): Promise<WalletSet[]> {
    const result = await this.getRequest<
      WalletSetListParameters,
      { walletSets: WalletSet[] }
    >("/walletSets", params);
    return result.walletSets;
  }
  async get(id: string): Promise<WalletSet> {
    const result = await this.getRequest<never, { walletSet: WalletSet }>(
      `/walletSets/${id}`,
    );
    return result.walletSet;
  }
}
