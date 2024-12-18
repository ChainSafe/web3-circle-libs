import { Form } from '@remix-run/react';
import { useState } from 'react';

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
  const [decimals, setDecimals] = useState(18);
  const onChangeToken = (tokenId: string) => {
    const token = balances.find((b) => b.token.id === tokenId);
    if (token) {
      setDecimals(token.token.decimals);
    }
  };

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
          <TokenSelect name="tokenId" balances={balances} onValueChange={onChangeToken} />
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
        <Input type="hidden" name="decimals" value={decimals} />
        <Button type="submit" className="mt-6 w-full" disabled={!!transactionData}>
          {transactionData?.state ? 'Transaction was successfully Sent' : 'Send'}
        </Button>
      </Form>
    </div>
  );
}
