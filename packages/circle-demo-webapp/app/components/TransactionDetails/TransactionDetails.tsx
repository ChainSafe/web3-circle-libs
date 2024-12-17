import { ChainLabel } from '~/components/ChainLabel';
import { Badge } from '~/components/ui/badge';
import { TransactionType } from '~/lib/constants';
import { formatDate, shortenAddress, shortenHash } from '~/lib/format';
import { Transaction } from '~/lib/types';

export interface TransactionDetailsProps {
  /** The on-chain transaction */
  transaction: Transaction;
}

/** The details of an on-chain transaction */
export function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const isInbound = transaction.transactionType === TransactionType.Inbound;

  return (
    <div>
      <div className="flex items-center gap-6 justify-between">
        <Badge variant="outline">{transaction.operation}</Badge>

        <div className="flex flex-col">
          <p className="text-sm text-gray-700">
            <strong>From:</strong> {shortenAddress(transaction.sourceAddress)}
          </p>

          <p className="text-sm text-gray-700">
            <strong>To:</strong> {shortenAddress(transaction.destinationAddress)}
          </p>
        </div>

        <p className="text-sm text-gray-700">
          <strong>Amount:</strong>{' '}
          <span
            className={`font-medium ${isInbound ? 'text-green-500' : 'text-red-500'}`}
          >
            {isInbound ? '+' : '-'}
            {transaction.amounts?.[0] ?? '0.00'}
          </span>
        </p>

        {/* <p className="text-sm text-gray-700">
          <strong>Fee:</strong> {transaction.networkFee}
        </p> */}

        <Badge variant="secondary">{transaction.state}</Badge>
      </div>

      <div className="flex items-center gap-6 justify-between">
        <ChainLabel blockchain={transaction.blockchain} />

        <p className="text-sm text-gray-700">
          <strong>Date:</strong>{' '}
          {formatDate(transaction.firstConfirmDate ?? transaction.createDate)}
        </p>

        <p className="text-sm text-gray-700" title={transaction.txHash}>
          <strong>Hash:</strong> {shortenHash(transaction.txHash ?? '')}
        </p>
      </div>
    </div>
  );
}
