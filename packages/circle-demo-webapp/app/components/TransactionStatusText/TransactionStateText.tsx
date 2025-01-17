import { useEffect } from 'react';

import { Badge } from '~/components/ui/badge';
import { TransactionState } from '~/lib/constants';

export interface TransactionStateTextProps {
  state: (typeof TransactionState)[keyof typeof TransactionState];
  getTransaction?: () => Promise<boolean>;
}

const greenStates = [TransactionState.Complete, TransactionState.Confirmed];
const yellowStates = [
  TransactionState.Sent,
  TransactionState.Initiated,
  TransactionState.Queued,
  TransactionState.PendingRiskScreening,
];

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export function TransactionStateText({
  state,
  getTransaction,
}: TransactionStateTextProps) {
  useEffect(() => {
    if (!greenStates.includes(state) && typeof getTransaction === 'function') {
      const interval = setInterval(() => {
        getTransaction().catch(console.error);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state, getTransaction]);

  return greenStates.includes(state) ? (
    <Badge variant="accent" className="font-normal text-green-600 dark:text-green-500">
      {capitalize(state)} ✓
    </Badge>
  ) : yellowStates.includes(state) ? (
    <Badge variant="accent" className="font-normal text-yellow-500 dark:text-yellow-400">
      {capitalize(state)}
    </Badge>
  ) : (
    <Badge variant="accent" className="font-normal text-red-500 dark:text-red-400">
      {capitalize(state)} ✘
    </Badge>
  );
}
