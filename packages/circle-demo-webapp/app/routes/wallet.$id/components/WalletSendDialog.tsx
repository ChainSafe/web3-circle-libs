import {
  Balance,
  CreateTransactionInput,
} from '@circle-fin/developer-controlled-wallets';
import {
  Transaction,
  Wallet,
} from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import {
  Notification,
  SendTransactionForm,
  SendTransactionFormInput,
  WalletDetails,
} from '@circle-libs/circle-react-elements';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { CircleError, ErrorResponse } from '~/lib/responses';
import { getExplorerUrl, isAddress } from '~/lib/utils';

// @todo: use constant exported from sdk
const isTransactionPending = (tx: Transaction) =>
  Boolean(tx?.state && !['CONFIRMED', 'CONFIRMED'].includes(tx?.state));

export interface WalletSendDialogProps {
  wallet: Wallet;
  balances: Balance[];
  onSendTransaction: (data: CreateTransactionInput) => Promise<Transaction | CircleError>;
  onScreenAddress?: (address: string) => Promise<{
    result: 'APPROVED' | 'DENIED';
  }>;
  onSent?: (data: Transaction) => void;
}

export function WalletSendDialog(props: WalletSendDialogProps) {
  const { wallet, balances, onSent, onSendTransaction, onScreenAddress } = props;
  const [open, setOpen] = useState(false);
  const [screeningAddressResult, setScreeningAddressResult] = useState<
    'APPROVED' | 'DENIED'
  >();
  const [serverError, setServerError] = useState<Error | undefined>();
  const [transactionData, setTransactionData] = useState({} as Transaction);
  const [successOpen, setSuccessOpen] = useState(false);
  const onSubmit: SubmitHandler<SendTransactionFormInput> = async (data) => {
    const res = await onSendTransaction({
      destinationAddress: data.destinationAddress,
      amounts: [data.amount],
      tokenId: data.tokenId,
      walletId: wallet.id,
      refId: data.note,
      fee: {
        type: 'level',
        config: {
          feeLevel: 'MEDIUM',
        },
      },
    } as CreateTransactionInput);

    if ((res as unknown as ErrorResponse)?.error) {
      setServerError(new Error((res as unknown as ErrorResponse).error));
      return;
    }

    const tx = res as Transaction;

    setTransactionData({ state: tx.state } as Transaction);
    setOpen(false);
    setSuccessOpen(true);
    if (typeof onSent === 'function') {
      onSent(tx);
    }
  };
  const onChangeAddress = (address: string) => {
    if (typeof onScreenAddress === 'function') {
      if (isAddress(address)) {
        onScreenAddress(address)
          .then((res) => {
            setScreeningAddressResult(res.result);
          })
          .catch(console.error);
      } else {
        setScreeningAddressResult('DENIED');
      }
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            <ArrowUp /> Send
          </Button>
        </DialogTrigger>

        <DialogContent className="min-w-[425px]">
          <div className="mb-4">
            <WalletDetails wallet={wallet} />
          </div>

          <DialogHeader>
            <DialogTitle>Send Transaction</DialogTitle>
            <DialogDescription>
              Send transaction to any blockchain address.
            </DialogDescription>
          </DialogHeader>

          <SendTransactionForm
            onSubmit={onSubmit}
            isSubmitting={isTransactionPending(transactionData)}
            serverError={serverError}
            screeningAddressResult={screeningAddressResult}
            wallet={wallet}
            balances={balances}
            onChangeAddress={onChangeAddress}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="min-w-[425px]">
          <Notification
            externalLink={
              transactionData?.txHash
                ? getExplorerUrl(wallet.blockchain, transactionData.txHash)
                : undefined
            }
            onClose={() => setSuccessOpen(false)}
            title="Transaction successful"
            description="Transaction was successfully sent"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
