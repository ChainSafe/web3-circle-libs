import { useCallback, useState } from 'react';

import { callFetch } from '~/lib/utils';

interface UpdateWalletArgs {
  id: string;
  name: string;
  description?: string;
}

interface UseUpdateWalletResult {
  error: Error | undefined;
  isLoading: boolean;
  updateWallet: (args: UpdateWalletArgs) => Promise<boolean>;
}

export const useUpdateWallet = (): UseUpdateWalletResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateWallet = useCallback(
    async (args: UpdateWalletArgs) => {
      setIsLoading(true);
      setError(undefined);
      try {
        await callFetch('/api/updateWallet', args);
        return true;
      } catch (err) {
        setError(err as Error);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError],
  );

  return {
    error,
    isLoading,
    updateWallet,
  };
};
