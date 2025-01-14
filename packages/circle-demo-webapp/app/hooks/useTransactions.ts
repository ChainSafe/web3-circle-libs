import useSWR, { mutate } from 'swr';

import { Transaction } from '~/lib/types';

interface UseTransactionsResult {
  data: Transaction[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export interface UseTransactionsOptions {
  filter: {
    address: string;
  };
}

const url = '/api/listTransactions';

export const useTransactions = (
  walletId: string,
  options?: UseTransactionsOptions,
): UseTransactionsResult => {
  const address = options?.filter?.address;
  const fullUrl = `${url}/${walletId}${address ? `?address=${String(address).trim()}` : ''}`;

  const { data, error, isLoading } = useSWR<Transaction[], Error>(fullUrl);

  const refetch = () => mutate(fullUrl);

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
