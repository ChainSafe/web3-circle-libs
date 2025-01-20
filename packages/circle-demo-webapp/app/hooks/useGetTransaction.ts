import { GetTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { useCallback, useState } from 'react';

import { TransactionWithToken } from '~/lib/types';
import { callGetFetch } from '~/lib/utils';

interface UseGetTransactionResult {
  error: Error | undefined;
  data: TransactionWithToken | undefined;
  isLoading: boolean;
  reFetch: () => Promise<boolean>;
}

export const useGetTransaction = (
  options: GetTransactionInput,
): UseGetTransactionResult => {
  const [data, setData] = useState<TransactionWithToken | undefined>();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reFetch = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const res = await callGetFetch<{ transaction: TransactionWithToken }>(
        `/api/getTransaction`,
        { ...options },
      );
      setData(res.transaction);
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
