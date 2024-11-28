import { DeveloperApi } from './DeveloperApi';
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

export class WalletApi extends DeveloperApi {
  /**
   * Generates a new developer-controlled wallet or batch of wallets within a wallet set,
   * specifying blockchain and wallet name.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet
   * @param params the parameters for the create wallet(s) request
   * @returns the new wallet(s)
   */
  async create(params: WalletCreateParameters): Promise<Wallet[]> {
    return this.postRequest<Wallet[]>(
      '/developer/wallets',
      await this.addCipherTextAndIdempotencyKeyToParams<WalletCreateParameters>(params),
      'wallets',
    );
  }

  /**
   * Retrieves a list of all wallets that fit the specified parameters.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets
   * @param params the parameters for the list wallets request
   * @returns the list of wallets
   */
  async list(params?: WalletListParameters): Promise<Wallet[]> {
    return this.getRequest<Wallet[]>('/wallets', params, 'wallets');
  }

  /**
   * Retrieve an existing wallet
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet
   * @param id the ID of the wallet to get
   * @returns the requested wallet
   */
  async get(id: string): Promise<Wallet> {
    return this.getRequest<Wallet>(`/wallets/${id}`, undefined, 'wallet');
  }

  /**
   * Updates info metadata of a wallet.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet
   * @param params the parameters for the wallet update request
   * @returns the updated wallet
   */
  async update(params: WalletUpdateParameters): Promise<Wallet> {
    return this.putRequest<Wallet>('/wallets', params, 'wallet');
  }

  /**
   * Fetches the digital asset balance for a single developer-controlled wallet using its unique identifier.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
   * @param params the parameters for the wallet token balance request
   * @returns the token balances for the specified wallet
   */
  async balance(params: WalletBalanceParameters): Promise<WalletTokenBalances> {
    const { id, ...rest } = params;
    return this.getRequest<WalletTokenBalances>(
      `/wallets/${id}/balances`,
      rest,
      'tokenBalances',
    );
  }

  /**
   * Fetches the info for all NFTs stored in a single developer-controlled wallet,
   * using the wallets unique identifier.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts
   * @param params the parameters for the get wallet NFTs request
   * @returns the NFTs for the specified wallet
   */
  async nfts(params: WalletNftsParameters): Promise<WalletNft[]> {
    const { id, ...rest } = params;
    return this.getRequest<WalletNft[]>(`/wallets/${id}/nfts`, rest, 'nfts');
  }
}
