import { ListTransactionsInput } from '@circle-fin/developer-controlled-wallets';
import { useCallback, useState } from 'react';

import { TransactionWithToken } from '~/lib/types';
import { callGetFetch } from '~/lib/utils';

interface UseTransactionsResult {
  data: TransactionWithToken[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
  reFetch: () => Promise<boolean>;
}

export const useTransactions = (
  options: ListTransactionsInput,
): UseTransactionsResult => {
  const [data, setData] = useState<TransactionWithToken[] | undefined>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const reFetch = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const filter: Record<string, string> = {
        includeAll: 'true',
        pageSize: '10',
      };
      if (options.destinationAddress) {
        filter.destinationAddress = options.destinationAddress;
      }

      if (options.walletIds) {
        filter.walletIds = options.walletIds;
      }
      console.log('filter', filter);
      const res = await callGetFetch<{
        transactions: TransactionWithToken[];
      }>(`/api/listTransactions`, filter);
      setData(res.transactions);
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
