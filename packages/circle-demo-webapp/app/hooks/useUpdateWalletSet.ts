import { useState } from 'react';

interface UpdateWalletSetArgs {
  id: string;
  name: string;
}

interface UseUpdateWalletSetResult {
  error: Error | undefined;
  isLoading: boolean;
  updateWalletSet: (args: UpdateWalletSetArgs) => Promise<void>;
}

export const useUpdateWalletSet = (): UseUpdateWalletSetResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateWalletSet = async ({ id, name }: UpdateWalletSetArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      await fetch('/api/updateWalletSet', {
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
    updateWalletSet,
  };
};
