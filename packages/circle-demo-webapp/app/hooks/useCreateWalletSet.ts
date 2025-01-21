import { useCallback, useState } from 'react';

import { callFetch } from '~/lib/utils';

interface CreateWalletSetArgs {
  name: string;
}

interface UseCreateWalletSetResult {
  error: Error | undefined;
  isLoading: boolean;
  createWalletSet: (args: CreateWalletSetArgs) => Promise<boolean>;
}

export const useCreateWalletSet = (): UseCreateWalletSetResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createWalletSet = useCallback(
    async (args: CreateWalletSetArgs) => {
      setIsLoading(true);
      setError(undefined);
      try {
        await callFetch('/api/createWalletSet', args);
        return true;
      } catch (err) {
        setError(err as Error);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading],
  );

  return {
    error,
    isLoading,
    createWalletSet,
  };
};
