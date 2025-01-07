import { Badge } from '~/components/ui/badge';
import { TransactionType } from '~/lib/constants';
import { formatDate, shortenAddress } from '~/lib/format';
import { Transaction } from '~/lib/types';

export interface TransactionTableRowProps {
  transaction: Transaction;
}

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
  const isInbound = transaction.transactionType === TransactionType.Inbound;

  return (
    <tr className="text-sm text-muted-foreground">
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
          isInbound ? 'text-green-600' : 'text-destructive'
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
