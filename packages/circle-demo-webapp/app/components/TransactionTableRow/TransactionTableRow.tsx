import type { Transaction } from 'web3-circle-sdk';

import { Badge } from '~/components/ui/badge';
import { formatDate, shortenAddress } from '~/lib/format';

export interface TransactionTableRowProps {
  transaction: Transaction;
}

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
  const isInbound = transaction.transactionType === 'INBOUND';

  return (
    <tr className="text-sm text-gray-500">
      <td className="py-2">
        <Badge variant="outline">{transaction.operation}</Badge>
      </td>

      <td className="px-4 py-2" title={transaction.sourceAddress}>
        {shortenAddress(transaction.sourceAddress)}
      </td>

      <td className="px-4 py-2" title={transaction.destinationAddress}>
        {shortenAddress(transaction.destinationAddress)}
      </td>

      <td
        className={`px-4 py-2 text-right font-medium ${
          isInbound ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isInbound ? '+' : '-'} {transaction.amounts?.[0] ?? '0.00'}
      </td>

      <td className="py-2 text-right">
        {formatDate(transaction.firstConfirmDate ?? transaction.createDate)}
      </td>
    </tr>
  );
}
