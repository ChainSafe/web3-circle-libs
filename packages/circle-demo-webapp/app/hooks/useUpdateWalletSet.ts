import { useState } from 'react';

import { ErrorResponse } from '~/lib/responses';

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

  const updateWalletSet = async ({ id, name }: UpdateWalletSetArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch('/api/updateWalletSet', {
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
    updateWalletSet,
  };
};
