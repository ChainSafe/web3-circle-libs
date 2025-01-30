import { ArrowUpRight } from 'lucide-react';
import { ReactNode, useEffect, useMemo } from 'react';

import { formatDate, shortenAddress } from '~/lib/format';
import { TransactionWithToken } from '~/lib/types';
import { cn, getExplorerUrl } from '~/lib/utils';

import { TokenItem } from '../TokenItem';
import { TransactionState } from '../TransactionState';
import { TableProvider, TransactionContext, useTable, useTransaction } from './context';

export interface TransactionProps {
  transaction: TransactionWithToken;
  onClickDetails?: (tx: TransactionWithToken) => void;
  children?: ReactNode;
  className?: string;
}

/**
 * Displays a transaction row within a table context.
 * Must be used within a `Transaction.Table` component.
 * Provides transaction data context to its children.
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
  type: 'from' | 'to';
  className?: string;
}

/**
 * Displays a transaction address cell.
 * Shows truncated address with full address in tooltip.
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

/**
 * Displays transaction status using TransactionState component.
 * Status is color-coded based on the transaction state.
 */
export function TransactionStatus({ className }: { className?: string }) {
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

/**
 * Displays token information using TokenItem component.
 * Shows token symbol and icon if available.
 */
export function TransactionToken({ className }: { className?: string }) {
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

/**
 * Displays transaction amount.
 * Color-coded: green for inbound, red for outbound.
 * Right-aligned with proper sign prefix.
 */
export function TransactionAmount({ className }: { className?: string }) {
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

/**
 * Displays formatted transaction date.
 * Uses first confirmation date if available, falls back to creation date.
 */
export function TransactionDate({ className }: { className?: string }) {
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

/**
 * Displays transaction actions: Details button and blockchain explorer link.
 * Details button appears only if onClickDetails handler is provided.
 */
export function TransactionActions({ className }: { className?: string }) {
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
  children?: ReactNode;
  className?: string;
}

/**
 * Container component for transaction table.
 * Provides table context and handles column registration.
 * Headers automatically adapt to included column components.
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
 * Table header component.
 * Automatically shows only columns that are being used in the table body.
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
 * Table body component.
 * Container for transaction rows.
 */
TransactionTable.Body = function TransactionTableBody({
  children,
}: {
  children: ReactNode;
}) {
  return <tbody>{children}</tbody>;
};
