import {
  CreateTransactionInput,
  GetTransactionInput,
} from '@circle-fin/developer-controlled-wallets';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useParams, useRevalidator } from '@remix-run/react';

import { TransactionTableHead } from '~/components/TransactionTableHead';
import { TransactionTableRow } from '~/components/TransactionTableRow';
import { Card } from '~/components/ui/card';
import { WalletBalance } from '~/components/WalletBalance';
import { WalletDetails } from '~/components/WalletDetails';
import { ScreenAddressResult } from '~/components/WalletSend';
import { useTransactions } from '~/hooks/useTransactions';
import { sdk } from '~/lib/sdk';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';
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

  const [balancesRes, walletRes, transactionsRes] = await Promise.all([
    sdk.getWalletTokenBalance({
      id,
      includeAll: true,
    }),
    sdk.getWallet({ id }),
    sdk.listTransactions({
      walletIds: [id],
      includeAll: true,
    }),
  ]);

  return {
    balances: (balancesRes?.data?.tokenBalances ?? []) as WalletTokenBalance[],
    wallet: walletRes?.data?.wallet as Wallet,
    transactions: transactionsRes?.data?.transactions as Transaction[],
  };
}

export default function WalletBalancePage() {
  const revalidator = useRevalidator();
  const { id } = useParams();
  const { balances, wallet, transactions } = useLoaderData<typeof loader>();
  const { refetch: refetchTransactions } = useTransactions(id ?? '');

  const refreshWalletSet = () => {
    revalidator.revalidate();
  };

  if (!id) {
    throw new Error('Wallet ID is required');
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-foreground">{wallet.name}</h1>
          <EditWalletDialog wallet={wallet} onSuccess={refreshWalletSet} />
        </div>

        <FaucetButton wallet={wallet} />
      </header>

      <Card className="p-4">
        <WalletDetails wallet={wallet}>
          <div className="flex space-x-3">
            <WalletReceiveDialog wallet={wallet} />
            <WalletSendDialog
              wallet={wallet}
              balances={balances}
              onSendTransaction={(data: CreateTransactionInput) =>
                callFetch<Transaction>('/api/createTransaction', data)
              }
              onGetTransaction={(data: GetTransactionInput) =>
                callFetch<{ transaction: Transaction }>('/api/getTransaction', data)
              }
              onConfirmed={() => refetchTransactions()}
              onScreenAddress={(address: string) =>
                callFetch<ScreenAddressResult>('/api/complianceScreenAddress', {
                  address,
                })
              }
            />
          </div>
        </WalletDetails>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-foreground mb-4">Balances</h2>

        <div className="space-y-4">
          {balances.length === 0 && <p>Wallet is empty</p>}

          {balances.map((balance) => (
            <WalletBalance key={balance.token.id} balance={balance} />
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-foreground mb-4">Transactions</h2>

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
  );
}
