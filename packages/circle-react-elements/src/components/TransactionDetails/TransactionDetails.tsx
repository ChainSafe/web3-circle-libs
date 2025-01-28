import { ReactNode, useMemo } from 'react';

import { formatDate, shortenHash } from '../../lib/format';
import { TransactionWithToken } from '../../lib/types';
import { ChainLabel } from '../ChainLabel';
import { TokenItem } from '../TokenItem';
import { TransactionStateText } from '../TransactionStateText';

/**
 * Props for the TransactionDetails component
 */
export interface TransactionDetailsProps {
  /**
   * The on-chain transaction data with token information
   * Includes transaction hash, addresses, amounts, token details, and state
   */
  transaction: TransactionWithToken;
}

/**
 * Helper component for displaying a single line of transaction details
 * Shows a label and value pair with consistent styling and spacing
 */
const OneLine = ({ label, value }: { label: string; value: ReactNode | string }) => (
  <div className="flex space-x-4 justify-between border-t py-2">
    <div className="flex-1">{label}</div>
    <div className="text-sm text-muted-foreground">{value}</div>
  </div>
);

/**
 * Displays detailed information about an on-chain transaction
 *
 * Features:
 * - Shows transaction hash with truncation
 * - Displays transaction state with appropriate styling
 * - Lists source and destination addresses
 * - Shows token details and amount with color coding for inbound/outbound
 * - Includes transaction date with formatting
 * - Displays blockchain network with icon
 * - Shows optional transaction note
 * - Consistent styling with borders and spacing
 * - Color-coded amounts (green for inbound, red for outbound)
 */
export function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const shortHash = useMemo(
    () => (transaction?.txHash ? shortenHash(transaction.txHash) : ''),
    [transaction],
  );
  if (!transaction) {
    return null;
  }

  const isInbound = transaction.transactionType === 'INBOUND';

  return (
    <div>
      <OneLine label="Hash" value={shortHash} />
      <OneLine
        label="Status"
        value={<TransactionStateText state={transaction.state} />}
      />
      <OneLine label="From" value={transaction.sourceAddress} />
      <OneLine label="To" value={transaction.destinationAddress} />
      {transaction.token && (
        <OneLine label="Token" value={<TokenItem token={transaction.token} />} />
      )}

      <OneLine
        label="Amount"
        value={
          <span
            className={`text-right font-medium ${
              isInbound ? 'text-green-600' : 'text-destructive'
            }`}
          >
            {isInbound ? '+' : '-'} {transaction.amounts?.[0] ?? '0.00'}
          </span>
        }
      />
      <OneLine
        label="Date"
        value={formatDate(transaction.firstConfirmDate ?? transaction.createDate)}
      />
      <OneLine
        label="Blockchain"
        value={<ChainLabel blockchain={transaction.blockchain} />}
      />
      <OneLine label="Note" value={transaction.refId} />
    </div>
  );
}
