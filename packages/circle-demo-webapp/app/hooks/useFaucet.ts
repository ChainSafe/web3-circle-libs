import { useState } from 'react';

interface RequestFaucetArgs {
  blockchain: string;
  address: string;
}

interface UseFaucetResult {
  error: Error | undefined;
  isLoading: boolean;
  requestFaucet: (args: RequestFaucetArgs) => Promise<void>;
}

export const useFaucet = (): UseFaucetResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestFaucet = async ({ blockchain, address }: RequestFaucetArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      await fetch('/api/faucet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blockchain, address }),
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
    requestFaucet,
  };
};
