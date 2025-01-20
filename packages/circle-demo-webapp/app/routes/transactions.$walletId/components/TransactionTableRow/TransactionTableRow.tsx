import { Link } from '@remix-run/react';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { TokenItem } from '~/components/TokenItem';
import { TransactionStateText } from '~/components/TransactionStatusText';
import { useGetTransaction } from '~/hooks/useGetTransaction';
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
  const [tx, setTx] = useState<TransactionWithToken>(transaction);
  const getTransactionFilter = useMemo(
    () => ({
      id: transaction.id,
    }),
    [transaction.id],
  );
  const { reFetch: getTransaction, data: latestTransaction } =
    useGetTransaction(getTransactionFilter);
  useEffect(() => {
    if (latestTransaction) {
      setTx(latestTransaction);
    }
  }, [latestTransaction]);
  const isInbound = tx.transactionType === TransactionType.Inbound;
  const explorerLink = getExplorerUrl(tx.blockchain, tx.txHash);
  return (
    <tr className="text-sm text-muted-foreground">
      <td className="px-4 py-2" title={tx.sourceAddress}>
        {shortenAddress(tx.sourceAddress)}
      </td>
      <td className="px-4 py-2" title={tx.destinationAddress}>
        {shortenAddress(tx.destinationAddress)}
      </td>
      <td className="px-4 py-2" title={tx.state}>
        <TransactionStateText state={tx.state} getTransaction={getTransaction} />
      </td>
      <td className="px-4 py-2" title={tx.tokenId}>
        {tx?.token ? <TokenItem token={tx.token} /> : '-'}
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          isInbound ? 'text-green-600' : 'text-destructive'
        }`}
      >
        {isInbound ? '+' : '-'} {tx.amounts?.[0] ?? '0.00'}
      </td>
      <td className="px-4 py-2 text-right">
        {formatDate(tx.firstConfirmDate ?? tx.createDate)}
      </td>
      <td className="py-2">
        <div className="flex justify-between">
          <button
            className="text-primary"
            onClick={() => {
              if (typeof onClickDetails === 'function') {
                onClickDetails(tx);
              }
            }}
          >
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
