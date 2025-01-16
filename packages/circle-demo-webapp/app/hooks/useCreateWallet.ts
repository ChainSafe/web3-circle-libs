import { useState } from 'react';

import { ErrorResponse } from '~/lib/responses';

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

  const createWallet = async (args: CreateWalletArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch('/api/createWallet', {
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
    createWallet,
  };
};
