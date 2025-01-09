import { useState } from 'react';

import { ErrorResponse } from '~/lib/responses';

interface RequestFaucetArgs {
  blockchain: string;
  address: string;
}

interface UseFaucetResult {
  error: Error | undefined;
  isLoading: boolean;
  requestFaucet: (args: RequestFaucetArgs) => Promise<boolean>;
}

export const useFaucet = (): UseFaucetResult => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestFaucet = async ({ blockchain, address }: RequestFaucetArgs) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch('/api/faucet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blockchain, address }),
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
    requestFaucet,
  };
};
