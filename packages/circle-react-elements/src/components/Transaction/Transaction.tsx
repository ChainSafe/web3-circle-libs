import { ArrowUpRight } from 'lucide-react';
import { ReactNode, useEffect, useMemo } from 'react';

import { formatDate, shortenAddress } from '~/lib/format';
import { ElementsTransactionWithToken } from '~/lib/types';
import { cn, getExplorerUrl } from '~/lib/utils';

import { TokenItem } from '../TokenItem';
import { TransactionState } from '../TransactionState';
import { TableProvider, TransactionContext, useTable, useTransaction } from './context';

export interface TransactionProps {
  /**
   * Transaction data with token information.
   * Includes transaction details like amounts, addresses, status, and associated token data.
   */
  transaction: ElementsTransactionWithToken;

  /**
   * Optional callback fired when Details button is clicked.
   * If not provided, Details button will not be shown.
   * @param tx The transaction data associated with the clicked row
   */
  onClickDetails?: (tx: ElementsTransactionWithToken) => void;

  /**
   * Optional child components for customizing the transaction row layout.
   * Should be Transaction.* components like Transaction.Address, Transaction.Amount, etc.
   */
  children?: ReactNode;

  /**
   * Optional CSS class name for styling the row container.
   */
  className?: string;
}

/**
 * A composable transaction row component for displaying blockchain transaction details in a table format.
 *
 * Features:
 * - Flexible column configuration through child components
 * - Context-based data sharing with child components
 * - Automatic table header generation based on used columns
 * - Color-coded transaction amounts and states
 * - Blockchain explorer integration
 * - Optional details view integration
 * - Address truncation with full address tooltips
 * - Responsive table layout
 *
 * Must be used within a Transaction.Table component.
 * Provides transaction data context to its children.
 *
 * @example
 * ```tsx
 * <Transaction.Table>
 *   <Transaction.Table.Head />
 *   <Transaction.Table.Body>
 *     <Transaction transaction={tx}>
 *       <Transaction.Address type="from" />
 *       <Transaction.Address type="to" />
 *       <Transaction.Status />
 *       <Transaction.Amount />
 *       <Transaction.Date />
 *       <Transaction.Actions />
 *     </Transaction>
 *   </Transaction.Table.Body>
 * </Transaction.Table>
 * ```
 */
export function TransactionRoot({
  transaction,
  onClickDetails,
  children,
  className,
}: TransactionProps) {
  const value = useMemo(
    () => ({
      transaction,
      onClickDetails,
    }),
    [transaction, onClickDetails],
  );

  return (
    <TransactionContext.Provider value={value}>
      <tr className={cn('text-sm', className)}>{children}</tr>
    </TransactionContext.Provider>
  );
}

export interface TransactionAddressProps {
  /**
   * Specifies whether this is a source ('from') or destination ('to') address.
   * Controls which address from the transaction data is displayed.
   */
  type: 'from' | 'to';

  /**
   * Optional CSS class name for styling the address cell.
   */
  className?: string;
}

/**
 * A table cell component for displaying blockchain addresses in a truncated format.
 *
 * Features:
 * - Automatic address truncation using shortenAddress utility
 * - Full address displayed in tooltip on hover
 * - Automatic column registration with table context
 * - Muted text color for better visual hierarchy
 * - Consistent padding and text size with table design
 * - Support for both source and destination addresses
 * - Graceful handling of null/undefined addresses
 */
export function TransactionAddress({ type, className }: TransactionAddressProps) {
  const { transaction } = useTransaction();
  const { registerComponent } = useTable();
  const address =
    type === 'from' ? transaction.sourceAddress : transaction.destinationAddress;

  useEffect(() => {
    registerComponent(`address-${type}`);
  }, [registerComponent, type]);

  return (
    <td className={cn('py-2 text-sm text-muted-foreground', className)} title={address}>
      {shortenAddress(address ?? '')}
    </td>
  );
}

interface TransactionStatusProps {
  /**
   * Optional CSS class name for styling the status cell.
   */
  className?: string;
}

/**
 * A table cell component that displays the current state of a transaction.
 *
 * Features:
 * - Color-coded status indicators based on transaction state
 * - Uses TransactionState component for consistent status display
 * - Automatic column registration with table context
 * - Consistent padding with table design
 * - Updates automatically when transaction state changes
 * - Accessible status indicators
 * - Support for all Circle transaction states
 */
export function TransactionStatus({ className }: TransactionStatusProps) {
  const { transaction } = useTransaction();
  const { registerComponent } = useTable();

  useEffect(() => {
    registerComponent('status');
  }, [registerComponent]);

  return (
    <td className={cn('py-2', className)}>
      <TransactionState state={transaction.state} />
    </td>
  );
}

interface TransactionTokenProps {
  /**
   * Optional CSS class name for styling the token cell.
   */
  className?: string;
}

/**
 * A table cell component that displays token information for a transaction.
 *
 * Features:
 * - Uses TokenItem component for consistent token display
 * - Shows token symbol and icon when available
 * - Falls back to "-" when token data is missing
 * - Automatic column registration with table context
 * - Token ID shown in tooltip for reference
 * - Handles missing token data gracefully
 * - Consistent padding with table design
 * - Clear visual representation of token identity
 */
export function TransactionToken({ className }: TransactionTokenProps) {
  const { transaction } = useTransaction();
  const { registerComponent } = useTable();

  useEffect(() => {
    registerComponent('token');
  }, [registerComponent]);

  return (
    <td className={cn('py-2', className)} title={transaction.tokenId}>
      {transaction?.token ? <TokenItem token={transaction.token} /> : '-'}
    </td>
  );
}

interface TransactionAmountProps {
  /**
   * Optional CSS class name for styling the amount cell.
   */
  className?: string;
}

/**
 * A table cell component that displays the transaction amount with visual indicators.
 *
 * Features:
 * - Color-coded amounts: green for inbound, red for outbound
 * - Automatic +/- prefix based on transaction type
 * - Right-aligned text for numerical values
 * - Bold text for better readability
 * - Automatic column registration with table context
 * - Consistent padding with table design
 * - Fallback to '0.00' for missing amounts
 * - Uses system's destructive and success colors
 */
export function TransactionAmount({ className }: TransactionAmountProps) {
  const { transaction } = useTransaction();
  const { registerComponent } = useTable();
  const isInbound = transaction.transactionType === 'INBOUND';

  useEffect(() => {
    registerComponent('amount');
  }, [registerComponent]);

  return (
    <td
      className={cn(
        'py-2 text-right font-medium',
        isInbound ? 'text-green-600' : 'text-destructive',
        className,
      )}
    >
      {isInbound ? '+' : '-'} {transaction.amounts?.[0] ?? '0.00'}
    </td>
  );
}

interface TransactionDateProps {
  /**
   * Optional CSS class name for styling the date cell.
   */
  className?: string;
}

/**
 * A table cell component that displays transaction dates in a formatted manner.
 *
 * Features:
 * - Smart date selection (confirmation date or creation date)
 * - Consistent date formatting using formatDate utility
 * - Right-aligned text for better readability
 * - Automatic column registration with table context
 * - Consistent padding with table design
 * - Graceful fallback to creation date if confirmation date is missing
 * - Timezone-aware date display
 * - User-friendly date format
 */
export function TransactionDate({ className }: TransactionDateProps) {
  const { transaction } = useTransaction();
  const { registerComponent } = useTable();

  useEffect(() => {
    registerComponent('date');
  }, [registerComponent]);

  return (
    <td className={cn('py-2 text-right', className)}>
      {formatDate(transaction.firstConfirmDate ?? transaction.createDate)}
    </td>
  );
}

interface TransactionActionsProps {
  /**
   * Optional CSS class name for styling the actions cell.
   */
  className?: string;
}

/**
 * A table cell component that provides interactive actions for a transaction.
 *
 * Features:
 * - Conditional Details button based on onClickDetails handler
 * - Blockchain explorer link with transaction hash
 * - Right-aligned action buttons
 * - Consistent spacing between actions
 * - Automatic column registration with table context
 * - Opens blockchain explorer in new tab
 * - Primary color styling for better visibility
 * - Icon indicators for external links
 * - Accessible link and button elements
 */
export function TransactionActions({ className }: TransactionActionsProps) {
  const { transaction, onClickDetails } = useTransaction();
  const { registerComponent } = useTable();

  useEffect(() => {
    registerComponent('actions');
  }, [registerComponent]);

  return (
    <td className={cn('py-2', className)}>
      <div className="flex justify-end gap-4">
        {typeof onClickDetails === 'function' && (
          <button className="text-primary" onClick={() => onClickDetails(transaction)}>
            Details
          </button>
        )}
        <a
          className="text-primary"
          href={getExplorerUrl(transaction.blockchain, transaction.txHash)}
          target="_blank"
          rel="noreferrer"
        >
          <ArrowUpRight />
        </a>
      </div>
    </td>
  );
}

export interface TransactionTableProps {
  /**
   * Child components for the table. Should include Transaction.Table.Head
   * and Transaction.Table.Body components.
   */
  children?: ReactNode;

  /**
   * Optional CSS class name for styling the table container.
   */
  className?: string;
}

/**
 * A container component that provides the foundation for displaying transaction data in a table format.
 *
 * Features:
 * - Table context provider for component registration
 * - Automatic header generation based on used columns
 * - Horizontal scrolling support for responsive design
 * - Full-width table layout
 * - Consistent styling across all table elements
 * - Dynamic column visibility based on used components
 * - Flexible composition through children props
 * - Maintains proper table semantics
 */
export function TransactionTable({ children, className }: TransactionTableProps) {
  return (
    <TableProvider>
      <div className={cn('w-full overflow-x-auto', className)}>
        <table className="w-full">{children}</table>
      </div>
    </TableProvider>
  );
}

/**
 * Table header component that automatically adapts to the columns being used.
 *
 * Features:
 * - Dynamic column visibility based on registered components
 * - Consistent header cell styling and padding
 * - Proper alignment matching cell content (left/right)
 * - Semantic HTML with thead element
 * - Proper text size and foreground color
 * - Responsive column headers
 * - Support for all transaction data types
 * - Automatic header text based on data type
 */
TransactionTable.Head = function TransactionTableHead() {
  const { registeredComponents } = useTable();

  return (
    <thead>
      <tr className="text-foreground text-left text-sm">
        {registeredComponents.has('address-from') && <th className="py-2">From</th>}
        {registeredComponents.has('address-to') && <th className="py-2">To</th>}
        {registeredComponents.has('status') && <th className="py-2">Status</th>}
        {registeredComponents.has('token') && <th className="py-2">Token Name</th>}
        {registeredComponents.has('amount') && (
          <th className="py-2 text-right">Amount</th>
        )}
        {registeredComponents.has('date') && <th className="py-2 text-right">Date</th>}
        {registeredComponents.has('actions') && (
          <th className="py-2 text-right">Actions</th>
        )}
      </tr>
    </thead>
  );
};

/**
 * Table body component that serves as a container for transaction rows.
 *
 * Features:
 * - Semantic HTML with tbody element
 * - Maintains proper table structure
 * - Supports multiple transaction rows
 * - Compatible with React.Fragment for row groups
 * - Preserves table layout continuity
 * - Ensures consistent row spacing
 * - Works seamlessly with TransactionRoot components
 * - Maintains proper DOM hierarchy
 */
TransactionTable.Body = function TransactionTableBody({
  children,
}: {
  children: ReactNode;
}) {
  return <tbody>{children}</tbody>;
};
