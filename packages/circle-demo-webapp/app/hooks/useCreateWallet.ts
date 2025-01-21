import { useCallback, useState } from 'react';

import { callFetch } from '~/lib/utils';

interface CreateWalletArgs {
  walletSetId: string;
  name: string;
  blockchain: string;
  description?: string;
}

interface UseCreateWalletResult {
  error: Error | undefined;
  isLoading: boolean;
  createWallet: (args: CreateWalletArgs) => Promise<boolean>;
}

export const useCreateWallet = (): UseCreateWalletResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createWallet = useCallback(
    async (args: CreateWalletArgs) => {
      setIsLoading(true);
      setError(undefined);
      try {
        await callFetch('/api/createWallet', args);
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
    createWallet,
  };
};
