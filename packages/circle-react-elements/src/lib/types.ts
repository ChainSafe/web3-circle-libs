import type { Blockchain } from '@circle-fin/developer-controlled-wallets';

/**
 * The token balance
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
 */
export interface WalletTokenBalance {
  /** The token balance amount */
  amount: string;
  token: {
    /** System-generated unique identifier of the resource. */
    id: string;
    /** Blockchain name of the specified token. */
    name: string;
    standard?: string;
    /** The blockchain network that the resource is to be created on or is currently on. */
    blockchain: Blockchain;
    /** Number of decimal places shown in the token amount. */
    decimals: number;
    /** Defines if the token is a native token of the specified blockchain. If TRUE, the token is a native token. */
    isNative: boolean;
    /** Blockchain symbol of the specified token. */
    symbol: string;
    /**
     * Blockchain generated unique identifier, associated with wallet (account),
     * smart contract or other blockchain objects.
     */
    tokenAddress?: string;
    /** Date and time the resource was last updated, in ISO-8601 UTC format. */
    updateDate: string;
    /** Date and time the resource was created, in ISO-8601 UTC format. */
    createDate: string;
  };
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
}
