import { Api } from "./base";
import { CreateParams, Wallet, WalletFilterOptions } from "./types";

export class WalletApi extends Api {
  async create(params: CreateParams): Promise<Wallet> {
    return this.postRequest<CreateParams, Wallet>("/wallets", params);
  }
  async createSet(params: CreateParams): Promise<Wallet> {
    return this.postRequest<CreateParams, Wallet>("/walletSets", params);
  }
  async list(params?: WalletFilterOptions): Promise<Wallet[]> {
    return this.getRequest<WalletFilterOptions, Wallet[]>("/wallets", params);
  }
}
