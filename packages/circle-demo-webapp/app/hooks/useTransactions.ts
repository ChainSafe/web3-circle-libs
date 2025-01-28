import { ListTransactionsInput } from '@circle-fin/developer-controlled-wallets';
import { useCallback, useState } from 'react';

import { TransactionWithToken } from '~/lib/types';
import { callGetFetch } from '~/lib/utils';

interface UseTransactionsResult {
  data: TransactionWithToken[];
  error: Error | undefined;
  isLoading: boolean;
  reFetch: () => Promise<boolean>;
}

export const useTransactions = (
  options: ListTransactionsInput,
): UseTransactionsResult => {
  const [data, setData] = useState<TransactionWithToken[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const reFetch = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const params = new URLSearchParams({
        includeAll: 'true',
        pageSize: '10',
      });
      if (options.destinationAddress) {
        params.set('destinationAddress', options.destinationAddress);
      }

      if (options.walletIds) {
        for (const walletId of options.walletIds) {
          params.append('walletIds', walletId);
        }
      }
      const res = await callGetFetch<{
        transactions: TransactionWithToken[];
      }>(`/api/listTransactions`, params);
      setData(res.transactions ?? []);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading, setData, options]);

  return {
    error,
    isLoading,
    data,
    reFetch,
  };
};
