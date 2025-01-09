import useSWR, { mutate } from 'swr';

import { Transaction } from '~/lib/types';

interface UseTransactionsResult {
  data: Transaction[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const url = '/api/listTransactions';

export const useTransactions = (walletId: string): UseTransactionsResult => {
  const { data, error, isLoading } = useSWR<Transaction[], Error>(`${url}/${walletId}`);

  const refetch = () => mutate(`${url}/${walletId}`);

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
