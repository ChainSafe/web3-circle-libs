import { useMemo, type ReactNode } from 'react';

import { CircleClient, CircleSdkContext } from './CircleSdkContext';

/**
 * React component that provides a context for interacting with a shared instance of Circle SDK
 *
 * @param children components that may require access to an instance of Circle SDK
 * @returns React component
 */
export function CircleSdkProvider({ children }: { children: ReactNode }) {
  const context = useMemo(() => {
    return {
      client: new CircleClient(),
    };
  }, []);

  return (
    <CircleSdkContext.Provider value={context}>{children}</CircleSdkContext.Provider>
  );
}
