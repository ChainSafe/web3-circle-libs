import { CreateTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { Transaction } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import {
  TransactionTableHead,
  TransactionTableRow,
  WalletBalance,
  WalletDetails,
} from '@circle-libs/circle-react-elements';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams, useRevalidator } from '@remix-run/react';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo } from 'react';

import { Badge } from '~/components/ui/badge';
import { Card } from '~/components/ui/card';
import { useToast } from '~/hooks/useToast';
import { useTransactions } from '~/hooks/useTransactions';
import { formatDate } from '~/lib/format';
import { sdk } from '~/lib/sdk';
import { callFetch } from '~/lib/utils';

import { EditWalletDialog } from './components/EditWalletDialog';
import { FaucetButton } from './components/FaucetButton';
import { WalletReceiveDialog } from './components/WalletReceiveDialog';
import { WalletSendDialog } from './components/WalletSendDialog';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    throw new Error('Wallet ID is required');
  }

  const [balancesRes, walletRes] = await Promise.all([
    sdk.getWalletTokenBalance({
      id,
      includeAll: true,
    }),
    sdk.getWallet({ id }),
  ]);

  return {
    balances: balancesRes?.data?.tokenBalances ?? [],
    wallet: walletRes?.data?.wallet,
  };
}

export default function WalletBalancePage() {
  const revalidator = useRevalidator();
  const { id } = useParams();
  const { balances, wallet } = useLoaderData<typeof loader>();
  const { toast } = useToast();
  const getTransactionFilter = useMemo(() => {
    return { walletIds: [id ?? ''] };
  }, [id]);
  const { data: transactions, reFetch: reFetchTransactions } =
    useTransactions(getTransactionFilter);

  useEffect(() => {
    reFetchTransactions().catch(console.error);
  }, [reFetchTransactions]);

  const revalidate = () => {
    revalidator.revalidate();
  };

  if (!id) {
    throw new Error('Wallet ID is required');
  }

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  return (
    <div>
      <header className="flex justify-between items-center bg-background px-8 py-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-foreground">{wallet.name}</h1>
          <EditWalletDialog wallet={wallet} onSuccess={revalidate} />
        </div>

        <FaucetButton wallet={wallet} />
      </header>

      <div className="p-8 space-y-6">
        <Card className="p-4">
          <WalletDetails
            wallet={wallet}
            onAddressCopy={(address: string) => {
              toast({
                description: `Address ${address} copied to clipboard.`,
              });
            }}
          >
            <div className="flex space-x-3">
              <WalletReceiveDialog wallet={wallet} />
              <WalletSendDialog
                wallet={wallet}
                balances={balances}
                onSendTransaction={(data: CreateTransactionInput) =>
                  callFetch<Transaction, CreateTransactionInput>(
                    '/api/createTransaction',
                    data,
                  )
                }
                onSent={() => {
                  reFetchTransactions().catch(console.error);
                }}
                onScreenAddress={(address: string) =>
                  callFetch<{
                    result: 'APPROVED' | 'DENIED';
                  }>('/api/complianceScreenAddress', {
                    address,
                    blockchain: wallet.blockchain,
                  })
                }
              />
            </div>
          </WalletDetails>

          <div className="mt-8">
            {wallet.refId && (
              <p className="text-sm text-muted-foreground mb-6">{wallet.refId}</p>
            )}

            <Badge
              variant="secondary"
              className="font-normal text-blue-600 dark:text-blue-500"
            >
              Created: {formatDate(wallet.createDate)}
            </Badge>

            <Badge
              variant="secondary"
              className="font-normal text-blue-600 dark:text-blue-500"
            >
              Updated: {formatDate(wallet.updateDate)}
            </Badge>
          </div>
        </Card>

        <div className="space-y-6 xl:space-y-0 xl:flex xl:space-x-6">
          <Card className="p-4 min-w-[360px]">
            <h2 className="text-xl font-semibold text-foreground mb-4">Balances</h2>

            <div className="space-y-4">
              {balances.length === 0 && <p>Wallet is empty</p>}

              {balances.map((balance) => (
                <WalletBalance key={balance.token.id} balance={balance} />
              ))}
            </div>
          </Card>

          <Card className="p-4 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-foreground">Transactions</h2>
              <Link to={`/transactions/${id}`} className={'text-primary flex'}>
                See more <ArrowUpRight />
              </Link>
            </div>

            <div className="space-y-4">
              {transactions.length === 0 && <p>No transactions</p>}

              {transactions.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <TransactionTableHead />

                    <tbody>
                      {transactions.map((tx) => (
                        <TransactionTableRow key={tx.id} transaction={tx} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
