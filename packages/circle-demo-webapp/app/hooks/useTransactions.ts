import useSWR, { mutate } from 'swr';

import { Transaction } from '~/lib/types';

interface UseTransactionsResult {
  data: Transaction[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const useTransactions = (walletId: string): UseTransactionsResult => {
  const { data, error, isLoading } = useSWR<Transaction[], Error>(
    `/api/listTransactions/${walletId}`,
  );

  const refetch = () => mutate(`/api/listTransactions/${walletId}`);

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
