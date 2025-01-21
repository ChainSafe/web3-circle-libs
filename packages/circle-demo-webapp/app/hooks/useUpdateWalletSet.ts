import { useState } from 'react';

import { callFetch } from '~/lib/utils';

interface UpdateWalletSetArgs {
  id: string;
  name: string;
}

interface UseUpdateWalletSetResult {
  error: Error | undefined;
  isLoading: boolean;
  updateWalletSet: (args: UpdateWalletSetArgs) => Promise<boolean>;
}

export const useUpdateWalletSet = (): UseUpdateWalletSetResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateWalletSet = async (args: UpdateWalletSetArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      await callFetch('/api/updateWalletSet', args);
      return true;
    } catch (err) {
      setError(err as Error);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    updateWalletSet,
  };
};
