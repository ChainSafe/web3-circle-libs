import type { Token } from '@circle-fin/developer-controlled-wallets';
import type {
  Transaction,
  Wallet,
  WalletSet,
} from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';

export interface ElementsTransactionWithToken extends Transaction {
  token?: Token;
}

export interface ElementsWalletSet extends WalletSet {
  name?: string;
  custodyType?: string;
}

export interface ElementsWallet extends Wallet {
  accountType?: string;
}

/**
 * A type for handling form submissions in React components.
 *
 * @template T - The shape of form data
 * @param data - The form data object containing field values
 * @param event - Optional React synthetic event from form submission
 * @returns A submission result
 *
 * @example
 * ```tsx
 * interface FormData {
 *   name: string;
 *   email: string;
 * }
 *
 * const handleSubmit: ElementsSubmitHandler<FormData> = async (data) => {
 *   const response = await submitToApi(data);
 *   return response;
 * };
 * ```
 */
export type ElementsSubmitHandler<T extends Record<string, unknown>> = (
  data: T,
  event?: React.BaseSyntheticEvent,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
) => Promise<unknown> | unknown;
