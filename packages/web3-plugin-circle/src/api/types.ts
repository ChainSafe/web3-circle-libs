export type CreateParams = {
  idempotencyKey: string;
  blockchains: string[];
  entitySecretCiphertext: string;
  walletSetId: string;
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

export type WalletFilterOptions = {
  address?: string;
  blockchain?: string;
  walletSetId?: string;
  refId?: string;
  from?: string;
  to?: string;
  pageBefore?: string;
  pageAfter?: string;
  pageSize?: number;
};

export type WalletSetListParameters = {
  from?: string;
  to?: string;
  pageBefore?: string;
  pageAfter?: string;
  pageSize?: number;
};
export type WalletSetCreateParameters = {
  idempotencyKey?: string;
  entitySecretCiphertext?: string;
  name?: string;
};
export type WalletSetUpdateParameters = {
  id: string;
  name: string;
};

export type WalletSet = {
  id: string;
  createDate: string;
  updateDate: string;
  custodyType: string;
  name?: string;
};
