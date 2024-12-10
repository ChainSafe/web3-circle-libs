import type {
  WalletCreateParameters,
  Wallet,
  WalletListParameters,
  WalletUpdateParameters,
  WalletBalanceParameters,
  WalletNftsParameters,
  WalletTokenBalances,
  WalletNft,
} from './types';
import { BaseApi } from './BaseApi';

export class WalletApi extends BaseApi {
  /**
   * Generates a new developer-controlled wallet or batch of wallets within a wallet set,
   * specifying blockchain and wallet name.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet
   * @param params the parameters for the create wallet(s) request
   * @returns the new wallet(s)
   */
  async create(params: WalletCreateParameters): Promise<Wallet[]> {
    return this.execute<Wallet[]>('wallet', 'create', params);
  }

  /**
   * Retrieves a list of all wallets that fit the specified parameters.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets
   * @param params the parameters for the list wallets request
   * @returns the list of wallets
   */
  async list(params?: WalletListParameters): Promise<Wallet[]> {
    return this.execute<Wallet[]>('wallet', 'list', params);
  }

  /**
   * Retrieve an existing wallet
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet
   * @param id the ID of the wallet to get
   * @returns the requested wallet
   */
  async get(id: string): Promise<Wallet> {
    return this.execute<Wallet>('wallet', 'get', id);
  }

  /**
   * Updates info metadata of a wallet.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet
   * @param params the parameters for the wallet update request
   * @returns the updated wallet
   */
  async update(params: WalletUpdateParameters): Promise<Wallet> {
    return this.execute<Wallet>('wallet', 'update', params);
  }

  /**
   * Fetches the digital asset balance for a single developer-controlled wallet using its unique identifier.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
   * @param params the parameters for the wallet token balance request
   * @returns the token balances for the specified wallet
   */
  async balance(params: WalletBalanceParameters): Promise<WalletTokenBalances> {
    return this.execute<WalletTokenBalances>('wallet', 'balance', params);
  }

  /**
   * Fetches the info for all NFTs stored in a single developer-controlled wallet,
   * using the wallets unique identifier.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts
   * @param params the parameters for the get wallet NFTs request
   * @returns the NFTs for the specified wallet
   */
  async nfts(params: WalletNftsParameters): Promise<WalletNft[]> {
    return this.execute<WalletNft[]>('wallet', 'nfts', params);
  }
}
