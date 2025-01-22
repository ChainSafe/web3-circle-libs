/**
 * Request types
 */
import type {
  Blockchain,
  Token,
  TransactionType,
} from '@circle-fin/developer-controlled-wallets';
import type {
  Transaction,
  Wallet as SdkWallet,
  WalletSet as SdkWalletSet,
} from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';

import { TestnetBlockchain } from '~/lib/constants';

export type TypeBlockchain = (typeof Blockchain)[keyof typeof Blockchain];
export type TypeTestnetBlockchain =
  (typeof TestnetBlockchain)[keyof typeof TestnetBlockchain];
export type TypeTransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export interface TransactionWithToken extends Transaction {
  token?: Token;
}

export interface WalletSet extends SdkWalletSet {
  name?: string;
  custodyType?: string;
}

export interface Wallet extends SdkWallet {
  accountType?: string;
}
