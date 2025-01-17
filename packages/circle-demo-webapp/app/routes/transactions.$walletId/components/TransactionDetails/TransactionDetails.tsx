import { LoaderCircle } from 'lucide-react';
import { useMemo } from 'react';

import { ChainLabel } from '~/components/ChainLabel';
import { TokenItem } from '~/components/TokenItem';
import { TransactionStateText } from '~/components/TransactionStatusText';
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog';
import { TransactionType } from '~/lib/constants';
import { formatDate, shortenHash } from '~/lib/format';
import { TransactionWithToken } from '~/lib/types';

const OneLine = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode | string;
}) => (
  <div className="flex space-x-4 justify-between border-t py-2">
    <div className="flex-1">{label}</div>
    <div className="text-sm text-muted-foreground">{value}</div>
  </div>
);

export interface TransactionDetailsProps {
  transaction: TransactionWithToken;
}

export interface TransactionLoadingDetailsProps {
  isLoading: boolean;
}

export interface CommonTransactionDetailsProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

/** The details of an on-chain account */
export function TransactionDetails(
  props: CommonTransactionDetailsProps &
    (TransactionDetailsProps | TransactionLoadingDetailsProps),
) {
  const transaction = (props as TransactionDetailsProps).transaction;
  const isLoading = (props as TransactionLoadingDetailsProps).isLoading;
  if (!transaction && !isLoading) {
    return null;
  }

  const shortHash = useMemo(() => shortenHash(transaction?.txHash!), [transaction]);
  const isInbound = transaction?.transactionType === TransactionType.Inbound;
  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent className="min-w-[480px]">
        <DialogTitle>Transaction Details</DialogTitle>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-40">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
