import { ArrowUpRight } from 'lucide-react';

import { formatDate, shortenAddress } from '~/lib/format';
import { TransactionWithToken } from '~/lib/types';
import { getExplorerUrl } from '~/lib/utils';

import { TokenItem } from '../TokenItem';
import { TransactionStateText } from '../TransactionStateText';

export interface TransactionTableRowProps {
  transaction: TransactionWithToken;
  withActions?: boolean;
  onClickDetails?: (tx: TransactionWithToken) => void;
}

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
        <TransactionStateText state={transaction.state} />
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
