import { ReactNode } from 'react';

import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog';

export interface TransactionDetailsProps {
  children?: ReactNode;
  onClose?: () => void;
}

/** The details of an on-chain account */
export function TransactionDetailsDialog(props: TransactionDetailsProps) {
  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent className="min-w-[480px]">
        <DialogTitle>Transaction Details</DialogTitle>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
