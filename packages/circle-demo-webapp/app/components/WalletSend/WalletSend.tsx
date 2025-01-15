import {
  CreateTransactionInput,
  GetTransactionInput,
} from '@circle-fin/developer-controlled-wallets';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { ComplianceEngineText } from '~/components/ComplianceEngineText';
import { FormErrorText } from '~/components/FormErrorText';
import { TokenSelect } from '~/components/TokenSelect';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { WalletDetails } from '~/components/WalletDetails';
import { FeeLevel } from '~/lib/constants';
import { CircleError, ErrorResponse } from '~/lib/responses';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';
import { isAddress, isNumber } from '~/lib/utils';

export interface ScreenAddressResult {
  result?: boolean;
}

export interface WalletSendProps {
  /** The wallet */
  wallet: Wallet;
  balances: WalletTokenBalance[];
  onSendTransaction: (data: CreateTransactionInput) => Promise<Transaction | CircleError>;
  onGetTransaction: (data: GetTransactionInput) => Promise<{ transaction: Transaction }>;
  onScreenAddress?: (address: string) => Promise<ScreenAddressResult>;
  onConfirmed?: (data: Transaction) => Promise<void>;
}

// @todo: use constant exported from sdk
const isTransactionPending = (tx: Transaction) =>
  Boolean(tx?.state && !['CONFIRMED', 'CONFIRMED'].includes(tx?.state));

interface IFormInput {
  destinationAddress: string;
  amount: string;
  tokenId: string;
  note: string;
}

const formSchema = z.object({
  destinationAddress: z.string().refine(isAddress, 'Address is not valid'),
  amount: z.string().refine(isNumber, 'Amount is not valid'),
  tokenId: z.string(),
  note: z.string().optional(),
});

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
  onScreenAddress,
}: WalletSendProps) {
  const [screeningAddressResult, setScreeningAddressResult] =
    useState<ScreenAddressResult>({});
  const [requestError, setRequestError] = useState<string>('');
  const [transactionData, setTransactionData] = useState({} as Transaction);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await onSendTransaction({
      destinationAddress: data.destinationAddress,
      amounts: [data.amount],
      tokenId: data.tokenId,
      walletId: wallet.id,
      refId: data.note,
      fee: {
        type: 'level',
        config: {
          feeLevel: FeeLevel.Medium,
        },
      },
    } as CreateTransactionInput);
    if ((res as unknown as ErrorResponse)?.error) {
      setRequestError((res as unknown as ErrorResponse).error);
      return;
    }
    const tx = res as Transaction;
    setTransactionData({ state: tx.state } as Transaction);
    if (tx.id) {
      const interval = setInterval(() => {
        const run = async () => {
          const { transaction } = await onGetTransaction({ id: tx.id });
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
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    if (typeof onScreenAddress === 'function') {
      if (isAddress(address)) {
        onScreenAddress(address)
          .then((res: ScreenAddressResult) => {
            setScreeningAddressResult(res);
          })
          .catch(console.error);
      } else {
        setScreeningAddressResult({});
      }
    }
  };

  return (
    <div className="items-center w-full">
      <WalletDetails wallet={wallet} />
      <h1 className="text-xl text-black mt-8">Send Transaction</h1>
      <p className="text-base text-gray-600">
        Send transaction to any blockchain address
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="w-full mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-ful">
          <Input
            placeholder="Recipient Address"
            className={`col-span-3 ${screeningAddressResult.result === undefined && errors.destinationAddress?.message ? 'border border-error' : ''}`}
            {...register('destinationAddress')}
            onChange={onChangeAddress}
          />
          {screeningAddressResult.result !== undefined ? (
            <ComplianceEngineText result={screeningAddressResult.result} />
          ) : (
            <FormErrorText value={errors.destinationAddress?.message} />
          )}
        </div>
        <div className="w-full">
          <Controller
            name="tokenId"
            control={control}
            render={({ field }) => (
              <TokenSelect
                balances={balances}
                onValueChange={field.onChange}
                className={`${errors.tokenId?.message ? 'border border-error' : ''}`}
              />
            )}
          />
          <FormErrorText value={errors.tokenId?.message} />
        </div>
        <div className="w-full">
          <Input
            placeholder="Amount"
            className={`col-span-3 ${errors.amount?.message ? 'border border-error' : ''}`}
            {...register('amount')}
          />
          <FormErrorText value={errors.amount?.message} />
        </div>
        <div className="w-full">
          <Textarea
            placeholder="Note(optional)"
            className="col-span-3 min-h-[100px]"
            {...register('note')}
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-6"
          disabled={isTransactionPending(transactionData)}
        >
          {isTransactionPending(transactionData) && (
            <LoaderCircle className="animate-spin" />
          )}
          Send
        </Button>
        {requestError && <FormErrorText value={requestError} />}
      </form>
    </div>
  );
}
