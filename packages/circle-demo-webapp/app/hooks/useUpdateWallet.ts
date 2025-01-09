import { useState } from 'react';

interface UpdateWalletArgs {
  id: string;
  name: string;
}

interface UseUpdateWalletResult {
  error: Error | undefined;
  isLoading: boolean;
  updateWallet: (args: UpdateWalletArgs) => Promise<void>;
}

export const useUpdateWallet = (): UseUpdateWalletResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateWallet = async ({ id, name }: UpdateWalletArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      await fetch('/api/updateWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name }),
      });
    } catch (err) {
      setError(err as Error);
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
