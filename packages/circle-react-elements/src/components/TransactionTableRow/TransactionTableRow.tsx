import { ArrowUpRight } from 'lucide-react';

import { formatDate, shortenAddress } from '~/lib/format';
import { TransactionWithToken } from '~/lib/types';
import { getExplorerUrl } from '~/lib/utils';

import { TokenItem } from '../TokenItem';
import { TransactionState } from '../TransactionState';

/**
 * Props for the TransactionTableRow component
 */
export interface TransactionTableRowProps {
  /**
   * Transaction data to display in the row
   * Includes transaction details and associated token information
   */
  transaction: TransactionWithToken;

  /**
   * Whether to show action buttons
   * When true, displays Details button and blockchain explorer link
   * @default false
   */
  withActions?: boolean;

  /**
   * Optional handler for when the Details button is clicked
   * @param tx - The transaction data for the clicked row
   */
  onClickDetails?: (tx: TransactionWithToken) => void;
}

/**
 * Table row component for displaying transaction information
 *
 * Features:
 * - Displays shortened addresses with full address in tooltip
 * - Shows transaction status with appropriate styling
 * - Displays token information using TokenItem component
 * - Color-coded amounts (green for inbound, red for outbound)
 * - Formatted dates
 * - Optional action buttons:
 *   - Details button to view transaction details
 *   - External link to blockchain explorer
 * - Consistent styling with table head component
 */
export function TransactionTableRow({
  transaction,
  withActions,
  onClickDetails,
}: TransactionTableRowProps) {
  const isInbound = transaction.transactionType === 'INBOUND';
  return (
    <tr className="text-sm text-muted-foreground">
      <td className="px-4 py-2" title={transaction.sourceAddress}>
        {shortenAddress(transaction.sourceAddress ?? '')}
      </td>
      <td className="px-4 py-2" title={transaction.destinationAddress}>
        {shortenAddress(transaction.destinationAddress ?? '')}
      </td>
      <td className="px-4 py-2" title={transaction.state}>
        <TransactionState state={transaction.state} />
      </td>
      <td className="px-4 py-2" title={transaction.tokenId}>
        {transaction?.token ? <TokenItem token={transaction.token} /> : '-'}
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          isInbound ? 'text-green-600' : 'text-destructive'
        }`}
      >
        {isInbound ? '+' : '-'} {transaction.amounts?.[0] ?? '0.00'}
      </td>
      <td className="px-4 py-2 text-right">
        {formatDate(transaction.firstConfirmDate ?? transaction.createDate)}
      </td>
      {withActions && (
        <td className="py-2">
          <div className="flex justify-between">
            {typeof onClickDetails === 'function' && (
              <button
                className="text-primary"
                onClick={() => {
                  if (typeof onClickDetails === 'function') {
                    onClickDetails(transaction);
                  }
                }}
              >
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
      )}
    </tr>
  );
}
