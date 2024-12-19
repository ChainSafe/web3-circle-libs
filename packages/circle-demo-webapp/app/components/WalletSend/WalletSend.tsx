import { Form } from '@remix-run/react';
import { LoaderCircle } from 'lucide-react';

import { TokenSelect } from '~/components/TokenSelect';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';

export interface WalletSendProps {
  /** The wallet */
  wallet: Wallet;
  balances: WalletTokenBalance[];
  transactionData?: Transaction;
}

/**
 * Helpers for obtaining a wallet's on-chain address:
 * a QR code that encodes the address and elements for viewing the address and copying it to the clipboard
 */
export function WalletSend({ wallet, balances, transactionData }: WalletSendProps) {
  return (
    <div className="items-center w-full">
      <Form method="post" className="w-full">
        <div className="w-ful mt-6">
          <Input
            type="text"
            name="recipientAddress"
            placeholder="Recipient Address"
            className="col-span-3"
          />
        </div>
        <div className="w-full mt-6">
          <TokenSelect name="tokenId" balances={balances} />
        </div>
        <div className="w-full mt-6">
          <Input type="text" name="amount" placeholder="Amount" className="col-span-3" />
        </div>
        <div className="w-full mt-6">
          <Textarea
            type="text"
            name="note"
            placeholder="Note(optional)"
            className="col-span-3 min-h-[100px]"
          />
        </div>
        <Input type="hidden" name="walletId" value={wallet.id} />
        <Button
          type="submit"
          className="mt-6 w-full"
          disabled={
            transactionData?.state && !['COMPLETE'].includes(transactionData?.state)
          }
        >
          {transactionData?.state === 'INITIATED' && (
            <LoaderCircle className="animate-spin" />
          )}
          Send
        </Button>
      </Form>
    </div>
  );
}
