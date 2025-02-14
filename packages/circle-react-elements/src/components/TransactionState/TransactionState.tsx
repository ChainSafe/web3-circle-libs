import { TransactionState as TransactionStateType } from '@circle-fin/developer-controlled-wallets';

import { Badge } from '../ui/badge';

/**
 * Props for the TransactionState component
 */
export interface TransactionStateProps {
  /**
   * The state of the transaction from Circle's API
   * Possible values:
   * - Success states: 'COMPLETE', 'CONFIRMED'
   * - In-progress states: 'SENT', 'INITIATED', 'QUEUED', 'PENDING_RISK_SCREENING'
   * - Error states: 'CANCELLED', 'DENIED', 'FAILED'
   */
  state: TransactionStateType;
}

/**
 * States that indicate successful transaction completion
 * Displayed in green with a checkmark
 */
const greenStates = ['COMPLETE', 'CONFIRMED'];

/**
 * States that indicate transaction is in progress
 * Displayed in yellow without icons
 */
const yellowStates = ['SENT', 'INITIATED', 'QUEUED', 'PENDING_RISK_SCREENING'];

/**
 * Capitalizes first letter of each word in a string
 */
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/**
 * Converts snake_case state to readable text
 */
const toText = (state: string) => state.replace(/_/gi, ' ');

/**
 * Displays transaction state with appropriate styling and icons
 *
 * Features:
 * - Color coding based on state:
 *   - Green for successful states
 *   - Yellow for in-progress states
 *   - Red for error states
 * - Icons to indicate status:
 *   - ✓ for successful states
 *   - ✘ for error states
 */
export function TransactionState({ state }: TransactionStateProps) {
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
