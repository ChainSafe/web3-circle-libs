import { useState } from 'react';

import { ErrorResponse } from '~/lib/responses';

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

  const createWalletSet = async (args: CreateWalletSetArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch('/api/createWalletSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
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
    createWalletSet,
  };
};
