import {
  CreateTransactionInput,
  GetTransactionInput,
} from '@circle-fin/developer-controlled-wallets';
import { Form } from '@remix-run/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { TokenSelect } from '~/components/TokenSelect';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { FeeLevel } from '~/lib/constants';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';
import { isValidString } from '~/lib/utils';

export interface WalletSendProps {
  /** The wallet */
  wallet: Wallet;
  balances: WalletTokenBalance[];
  onSendTransaction: (data: CreateTransactionInput) => Promise<Transaction>;
  onGetTransaction: (data: GetTransactionInput) => Promise<{ transaction: Transaction }>;
  onConfirmed?: (data: Transaction) => Promise<void>;
}

/**
 * Helpers for obtaining a wallet's on-chain address:
 * a QR code that encodes the address and elements for viewing the address and copying it to the clipboard
 */
export function WalletSend({
  wallet,
  balances,
  onSendTransaction,
  onGetTransaction,
  onConfirmed,
}: WalletSendProps) {
  const [transactionData, setTransactionData] = useState({} as Transaction);

  // @todo: use constant exported from sdk
  const isTransactionPending = (tx: Transaction) =>
    Boolean(tx?.state && !['CONFIRMED', 'CONFIRMED'].includes(tx?.state));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if (!isValidString(data.recipientAddress)) {
      throw new Error('Invalid recipient address');
    }
    if (!isValidString(data.amount) || !(Number(data.amount) > 0)) {
      throw new Error('Invalid amount');
    }
    if (!isValidString(data.tokenId)) {
      throw new Error('Invalid token');
    }
    if (!isValidString(data.walletId)) {
      throw new Error('Invalid wallet');
    }

    if (data.note && !isValidString(data.note)) {
      throw new Error('Invalid note');
    }

    const res = await onSendTransaction({
      destinationAddress: data.recipientAddress,
      amounts: [data.amount],
      tokenId: data.tokenId,
      walletId: data.walletId,
      refId: data.note,
      fee: {
        type: 'level',
        config: {
          feeLevel: FeeLevel.Medium,
        },
      },
    });
    setTransactionData({ state: res.state } as Transaction);
    if (res.id) {
      const interval = setInterval(() => {
        const run = async () => {
          const { transaction } = await onGetTransaction({ id: res.id });
          setTransactionData(transaction);
          if (transaction && !isTransactionPending(transaction)) {
            clearInterval(interval);
            if (typeof onConfirmed === 'function') {
              await onConfirmed(transaction);
            }
          }
        };
        run().catch(console.error);
      }, 1000);
    }
  };
  return (
    <div className="items-center w-full">
      <Form
        method="post"
        className="w-full"
        onSubmit={(e) => {
          handleSubmit(e).catch(console.error);
        }}
      >
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
          disabled={isTransactionPending(transactionData)}
        >
          {isTransactionPending(transactionData) && (
            <LoaderCircle className="animate-spin" />
          )}
          Send
        </Button>
      </Form>
    </div>
  );
}
