import { TransactionType } from '@circle-fin/developer-controlled-wallets';
import { useEffect, useState } from 'react';

import { ChainLabel } from '~/components/ChainLabel';
import { Badge } from '~/components/ui/badge';
import { formatDate, shortenAddress, shortenHash } from '~/lib/format';
import { Transaction } from '~/lib/types';

export interface TransactionDetailsProps {
  /** The on-chain transaction */
  transaction: Transaction;
}

export interface ActiveTransactionDetailsProps {
  /** The on-chain transaction */
  transactionId: string;
  loadTransactionById: (transactionId: string) => Promise<Transaction>;
}

/** The details of an on-chain transaction */
export function TransactionDetails(
  props: TransactionDetailsProps | ActiveTransactionDetailsProps,
) {
  const [transaction, setTransaction] = useState<Transaction>(
    (props as TransactionDetailsProps)?.transaction,
  );
  useEffect(() => {
    if ((props as ActiveTransactionDetailsProps)?.transactionId) {
      (props as ActiveTransactionDetailsProps)
        .loadTransactionById((props as ActiveTransactionDetailsProps).transactionId)
        .then((tx) => {
          setTransaction(tx);
        });
    }
  }, [
    (props as ActiveTransactionDetailsProps)?.transactionId,
    (props as ActiveTransactionDetailsProps).loadTransactionById,
  ]);

  if (!transaction) {
    return null;
  }

  const isInbound = transaction.transactionType === TransactionType.Inbound;

  return (
    <div>
      <div className="flex items-center gap-6 justify-between">
        <Badge variant="outline">{transaction.operation}</Badge>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            <strong>From:</strong> {shortenAddress(transaction.sourceAddress)}
          </p>

          <p className="text-sm text-muted-foreground">
            <strong>To:</strong> {shortenAddress(transaction.destinationAddress)}
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          <strong>Amount:</strong>{' '}
          <span
            className={`font-medium ${isInbound ? 'text-green-600' : 'text-destructive'}`}
          >
            {isInbound ? '+' : '-'}
            {transaction.amounts?.[0] ?? '0.00'}
          </span>
        </p>

        {/* <p className="text-sm text-muted-foreground">
          <strong>Fee:</strong> {transaction.networkFee}
        </p> */}

        <Badge variant="secondary">{transaction.state}</Badge>
      </div>

      <div className="flex items-center gap-6 justify-between">
        <ChainLabel blockchain={transaction.blockchain} />

        <p className="text-sm text-muted-foreground">
          <strong>Date:</strong>{' '}
          {formatDate(transaction.firstConfirmDate ?? transaction.createDate)}
        </p>

        <p className="text-sm text-muted-foreground" title={transaction.txHash}>
          <strong>Hash:</strong> {shortenHash(transaction.txHash ?? '')}
        </p>
      </div>
    </div>
  );
}
