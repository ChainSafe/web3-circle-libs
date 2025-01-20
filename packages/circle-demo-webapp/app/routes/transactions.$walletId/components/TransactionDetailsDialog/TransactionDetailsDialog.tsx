import { LoaderCircle } from 'lucide-react';
import { ReactNode } from 'react';

import { TransactionDetails } from '~/components/TransactionDetails';
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog';
import { TransactionWithToken } from '~/lib/types';

export interface TransactionDetailsProps {
  transaction: TransactionWithToken;
}

export interface TransactionLoadingDetailsProps {
  isLoading: boolean;
}

export interface CommonTransactionDetailsProps {
  children?: ReactNode;
  onClose?: () => void;
}

/** The details of an on-chain account */
export function TransactionDetailsDialog(
  props: CommonTransactionDetailsProps &
    (TransactionDetailsProps | TransactionLoadingDetailsProps),
) {
  const transaction = (props as TransactionDetailsProps).transaction;
  const isLoading = (props as TransactionLoadingDetailsProps).isLoading;

  if (!transaction && !isLoading) {
    return null;
  }

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent className="min-w-[480px]">
        <DialogTitle>Transaction Details</DialogTitle>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-40">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <TransactionDetails transaction={transaction} />
        )}
      </DialogContent>
    </Dialog>
  );
}
