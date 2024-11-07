import {
  WalletCreateParameters,
  Wallet,
  WalletListParameters,
  WalletUpdateParameters,
  WalletBalanceParameters,
  WalletNftsParameters,
  WalletTokenBalances,
  WalletNft,
} from "./types";
import { DeveloperApi } from "./DeveloperApi";
import { v4 } from "uuid";

export class WalletApi extends DeveloperApi {
  async create(params: WalletCreateParameters): Promise<Wallet[]> {
    return this.postRequest<Wallet[]>(
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
    return this.getRequest<Wallet[]>("/wallets", params, "wallets");
  }
  async get(id: string): Promise<Wallet> {
    return this.getRequest<Wallet>(`/wallets/${id}`, undefined, "wallet");
  }
  async update(params: WalletUpdateParameters): Promise<Wallet> {
    return this.putRequest<Wallet>("/wallets", params, "wallet");
  }
  async balance(params: WalletBalanceParameters): Promise<WalletTokenBalances> {
    const { id, ...rest } = params;
    return this.getRequest<WalletTokenBalances>(
      `/wallets/${id}/balances`,
      rest,
      "tokenBalances",
    );
  }
  async nfts(params: WalletNftsParameters): Promise<WalletNft[]> {
    const { id, ...rest } = params;
    return this.getRequest<WalletNft[]>(`/wallets/${id}/nfts`, rest, "nfts");
  }
}
