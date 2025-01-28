import { useCallback, useState } from 'react';

import { ElementsWalletSet } from '~/lib/types';
import { callFetch } from '~/lib/utils';

interface CreateWalletSetArgs {
  name: string;
}

interface UseCreateWalletSetResult {
  error: Error | undefined;
  isLoading: boolean;
  createWalletSet: (args: CreateWalletSetArgs) => Promise<boolean | ElementsWalletSet>;
}

export const useCreateWalletSet = (): UseCreateWalletSetResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createWalletSet = useCallback(
    async (args: CreateWalletSetArgs) => {
      setIsLoading(true);
      setError(undefined);
      try {
        return await callFetch<ElementsWalletSet>('/api/createWalletSet', args);
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
