import { TransactionState } from '@circle-fin/developer-controlled-wallets';

import { Badge } from '../ui/badge';

export interface TransactionStateTextProps {
  /** The state of the transaction:
   *  'CANCELLED', 'CONFIRMED', 'COMPLETE', 'DENIED', 'FAILED', 'INITIATED', 'PENDING_RISK_SCREENING', 'QUEUED', 'SENT';
   *
   * **/
  state: TransactionState;
}

const greenStates = ['COMPLETE', 'CONFIRMED'];
const yellowStates = ['SENT', 'INITIATED', 'QUEUED', 'PENDING_RISK_SCREENING'];

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const toText = (state: string) => state.replace(/_/gi, ' ');

/** Display transaction state text **/
export function TransactionStateText({ state }: TransactionStateTextProps) {
  return greenStates.includes(state) ? (
    <Badge
      variant="accent"
      className="font-normal text-green-600 dark:text-green-500 whitespace-nowrap"
    >
      {capitalize(toText(state))} ✓
    </Badge>
  ) : yellowStates.includes(state) ? (
    <Badge
      variant="accent"
      className="font-normal text-yellow-500 dark:text-yellow-400 whitespace-nowrap"
    >
      {capitalize(toText(state))}
    </Badge>
  ) : (
    <Badge
      variant="accent"
      className="font-normal text-red-500 dark:text-red-400 whitespace-nowrap"
    >
      {capitalize(toText(state))} ✘
    </Badge>
  );
}
