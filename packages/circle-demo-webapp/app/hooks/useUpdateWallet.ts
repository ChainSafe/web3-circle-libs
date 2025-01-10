import { useState } from 'react';

import { ErrorResponse } from '~/lib/responses';

interface UpdateWalletArgs {
  id: string;
  name: string;
}

interface UseUpdateWalletResult {
  error: Error | undefined;
  isLoading: boolean;
  updateWallet: (args: UpdateWalletArgs) => Promise<boolean>;
}

export const useUpdateWallet = (): UseUpdateWalletResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateWallet = async ({ id, name }: UpdateWalletArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch('/api/updateWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name }),
      });

      if (response.status !== 200) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.error);
      }

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
    updateWallet,
  };
};
