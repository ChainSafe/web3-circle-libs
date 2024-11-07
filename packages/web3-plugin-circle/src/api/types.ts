/**
 * Request types
 */

export type FilterPagesOptions = {
  pageBefore?: string;
  pageAfter?: string;
  pageSize?: number;
};
export type FilterOptions = {
  from?: string;
  to?: string;
} & FilterPagesOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet
 */
export type WalletCreateParameters = {
  walletSetId: string;
  blockchains: string[];
  idempotencyKey: string;
  accountType?: string;
  count?: number;
  metadata?: { [key: string]: any }[];
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets
 */
export type WalletListParameters = {
  address?: string;
  blockchain?: string;
  walletSetId?: string;
  refId?: string;
} & FilterOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet
 */
export type WalletUpdateParameters = {
  id: string;
  name?: string;
  refId?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
 */
export type WalletBalanceParameters = {
  id: string;
  includeAll?: boolean;
  name?: string;
  tokenAddress?: string;
  standard?: string;
} & FilterPagesOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts
 */
export type WalletNftsParameters = {
  id: string;
  includeAll?: boolean;
  name?: string;
  tokenAddress?: string;
  standard?: string;
} & FilterPagesOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets
 */
export type WalletSetListParameters = FilterOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set
 */
export type WalletSetCreateParameters = {
  idempotencyKey?: string;
  name?: string;
};
export type DeveloperFields = {
  entitySecretCiphertext: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set
 */
export type WalletSetUpdateParameters = {
  id: string;
  name: string;
};

/**
 * Response types
 */
export type WalletSet = {
  id: string;
  createDate: string;
  updateDate: string;
  custodyType: string;
  name?: string;
};
export type WalletTokenBalances = {
  amount: string;
  token: {
    id: string;
    name: string;
    standard: string;
    blockchain: string;
    decimals: number;
    isNative: boolean;
    symbol: string;
    tokenAddress: string;
    updateDate: string;
    createDate: string;
  };
  updateDate: string;
};

export type WalletNft = {
  amount: string;
  metadata: string;
  nftTokenId: string;
  token: {
    id: string;
    name: string;
    standard: string;
    blockchain: string;
    decimals: number;
    isNative: boolean;
    symbol: string;
    tokenAddress: string;
    updateDate: string;
    createDate: string;
  };
  updateDate: string;
};

export type Wallet = {
  id: string;
  address: string;
  blockchain: string;
  createDate: string; // You can also use Date if you prefer to parse it
  updateDate: string; // Same here
  custodyType: string; // Use specific value if it’s always this, or allow other potential types
  name: string;
  refId: string;
  state: string; // If the state can only have specific values, you can use string literals like 'LIVE' | 'INACTIVE'
  userId: string;
  walletSetId: string;
  initialPublicKey: string;
  accountType: string; // Use string literal if there are multiple fixed types
};
