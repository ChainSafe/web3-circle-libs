import { ReactNode, useMemo } from 'react';

import { ChainLabel } from '~/components/ChainLabel';
import { TokenItem } from '~/components/TokenItem';
import { TransactionStateText } from '~/components/TransactionStatusText';
import { useGetTransaction } from '~/hooks/useGetTransaction';
import { TransactionType } from '~/lib/constants';
import { formatDate, shortenHash } from '~/lib/format';
import { TransactionWithToken } from '~/lib/types';

export interface TransactionDetailsProps {
  /** The on-chain transaction */
  transaction: TransactionWithToken;
}

const OneLine = ({ label, value }: { label: string; value: ReactNode | string }) => (
  <div className="flex space-x-4 justify-between border-t py-2">
    <div className="flex-1">{label}</div>
    <div className="text-sm text-muted-foreground">{value}</div>
  </div>
);

/** The details of an on-chain transaction */
export function TransactionDetails(props: TransactionDetailsProps) {
  const getTransactionFilter = useMemo(
    () => ({ id: props.transaction?.id }),
    [props.transaction],
  );
  const { data: transaction, reFetch } = useGetTransaction(
    getTransactionFilter,
    props.transaction,
  );
  const shortHash = useMemo(
    () => (transaction?.txHash ? shortenHash(transaction.txHash) : ''),
    [transaction],
  );
  if (!transaction) {
    return null;
  }

  const isInbound = transaction.transactionType === TransactionType.Inbound;

  return (
    <div>
      <OneLine label="Hash" value={shortHash} />
      <OneLine
        label="Status"
        value={
          <TransactionStateText state={transaction.state} getTransaction={reFetch} />
        }
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
