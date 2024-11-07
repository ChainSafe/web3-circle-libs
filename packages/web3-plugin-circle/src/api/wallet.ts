import {
  WalletCreateParameters,
  Wallet,
  WalletFilterOptions,
  WalletListParameters,
  WalletUpdateParameters,
  WalletBalanceParameters,
  WalletNftsParameters,
  DeveloperFields,
  WalletTokenBalances,
  WalletNft,
} from "./types";
import { DeveloperApi } from "./baseDeveloperApi";
import { v4 } from "uuid";

export class WalletApi extends DeveloperApi {
  async create(params: WalletCreateParameters): Promise<Wallet[]> {
    return this.postRequest<WalletCreateParameters & DeveloperFields, Wallet[]>(
      "/developer/wallets",
      {
        ...params,
        idempotencyKey: params.idempotencyKey ?? v4(),
        entitySecretCiphertext: this.generateCipherText(),
      },
      "wallets",
    );
  }
  async list(params?: WalletListParameters): Promise<Wallet[]> {
    return this.getRequest<WalletListParameters, Wallet[]>(
      "/wallets",
      params,
      "wallets",
    );
  }
  async get(id: string): Promise<Wallet> {
    return this.getRequest<never, Wallet>(
      `/wallets/${id}`,
      undefined,
      "wallet",
    );
  }
  async update(params: WalletUpdateParameters): Promise<Wallet> {
    return this.putRequest<WalletUpdateParameters, Wallet>(
      "/wallets",
      params,
      "wallet",
    );
  }
  async balance(params: WalletBalanceParameters): Promise<WalletTokenBalances> {
    const { id, ...rest } = params;
    return this.getRequest<
      Omit<WalletFilterOptions, "id">,
      WalletTokenBalances
    >(`/wallets/${id}/balances`, rest, "tokenBalances");
  }
  async nfts(params: WalletNftsParameters): Promise<WalletNft[]> {
    const { id, ...rest } = params;
    return this.getRequest<Omit<WalletNftsParameters, "id">, WalletNft[]>(
      `/wallets/${id}/nfts`,
      rest,
      "nfts",
    );
  }
}
