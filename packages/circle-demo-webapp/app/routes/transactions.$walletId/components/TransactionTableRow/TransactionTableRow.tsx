import { Link } from '@remix-run/react';
import { ArrowUpRight } from 'lucide-react';

import { TokenItem } from '~/components/TokenItem';
import { TransactionStateText } from '~/components/TransactionStatusText';
import { TransactionType } from '~/lib/constants';
import { formatDate, shortenAddress } from '~/lib/format';
import { TransactionWithToken } from '~/lib/types';
import { getExplorerUrl } from '~/lib/utils';

export interface TransactionTableRowProps {
  transaction: TransactionWithToken;
  onClickDetails?: (tx: TransactionWithToken) => void;
}

export function TransactionTableRow({
  transaction,
  onClickDetails,
}: TransactionTableRowProps) {
  const isInbound = transaction.transactionType === TransactionType.Inbound;
  const explorerLink = getExplorerUrl(transaction.blockchain, transaction.txHash);
  return (
    <tr className="text-sm text-muted-foreground">
      <td className="px-4 py-2" title={transaction.sourceAddress}>
        {shortenAddress(transaction.sourceAddress)}
      </td>
      <td className="px-4 py-2" title={transaction.destinationAddress}>
        {shortenAddress(transaction.destinationAddress)}
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
      <td className="py-2">
        <div className="flex justify-between">
          <button className="text-primary" onClick={() => onClickDetails(transaction)}>
            Details
          </button>
          <Link className="text-primary" to={explorerLink} target="_blank">
            <ArrowUpRight />
          </Link>
        </div>
      </td>
    </tr>
  );
}
