import type { Token } from '@circle-fin/developer-controlled-wallets';
import type {
  Transaction,
  Wallet,
  WalletSet,
} from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';

export interface TransactionWithToken extends Transaction {
  token?: Token;
}

export interface ElementsWalletSet extends WalletSet {
  name?: string;
  custodyType?: string;
}

export interface ElementsWallet extends Wallet {
  accountType?: string;
}
