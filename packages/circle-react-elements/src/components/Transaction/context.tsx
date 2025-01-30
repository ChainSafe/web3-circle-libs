import { createContext, useCallback, useContext, useState } from 'react';

import { TransactionWithToken } from '~/lib/types';

export interface TransactionContextType {
  transaction: TransactionWithToken;
  onClickDetails?: (tx: TransactionWithToken) => void;
}

export const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a Transaction.Root');
  }
  return context;
}

type ComponentKey =
  | 'address-from'
  | 'address-to'
  | 'status'
  | 'token'
  | 'amount'
  | 'date'
  | 'actions';

interface TableContextType {
  registerComponent: (key: ComponentKey) => void;
  registeredComponents: Set<ComponentKey>;
}

const TableContext = createContext<TableContextType>({
  registerComponent: () => void 0,
  registeredComponents: new Set(),
});

export function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
}

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [registeredComponents, setRegisteredComponents] = useState(
    new Set<ComponentKey>(),
  );

  const registerComponent = useCallback((key: ComponentKey) => {
    setRegisteredComponents((prev) => new Set(prev).add(key)); // Ensures reactivity
  }, []);

  return (
    <TableContext.Provider value={{ registeredComponents, registerComponent }}>
      {children}
    </TableContext.Provider>
  );
}
