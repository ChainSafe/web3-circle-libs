import { GetTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { useCallback, useState } from 'react';

import { TransactionWithToken } from '~/lib/types';
import { callGetFetch } from '~/lib/utils';

interface UseGetTransactionResult {
  error: Error | undefined;
  transaction: TransactionWithToken | undefined;
  isLoading: boolean;
  getTransaction: (args: GetTransactionInput) => Promise<boolean>;
}

export const useGetTransaction = (): UseGetTransactionResult => {
  const [transaction, setTransaction] = useState<TransactionWithToken | undefined>();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTransaction = useCallback(
    async (args: GetTransactionInput) => {
      setIsLoading(true);
      setError(undefined);
      try {
        const res = await callGetFetch<{ transaction: TransactionWithToken }>(
          `/api/getTransaction`,
          args as unknown as Record<string, string>,
        );
        setTransaction(res.transaction);
        return true;
      } catch (err) {
        setError(err as Error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading, setTransaction],
  );

  return {
    error,
    isLoading,
    transaction,
    getTransaction,
  };
};
