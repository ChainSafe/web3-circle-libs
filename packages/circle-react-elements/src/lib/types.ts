import type { Token } from '@circle-fin/developer-controlled-wallets';
import type { Transaction } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';

export interface TransactionWithToken extends Transaction {
  token?: Token;
}
