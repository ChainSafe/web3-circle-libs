import { useCallback, useState } from 'react';

import { callFetch } from '~/lib/utils';

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

  const requestFaucet = useCallback(
    async ({ blockchain, address }: RequestFaucetArgs) => {
      setIsLoading(true);
      setError(undefined);
      try {
        await callFetch('/api/faucet', { blockchain, address });
        return true;
      } catch (err) {
        setError(err as Error);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setError, setIsLoading],
  );

  return {
    error,
    isLoading,
    requestFaucet,
  };
};
