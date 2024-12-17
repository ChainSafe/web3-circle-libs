import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { ArrowUp } from 'lucide-react';

import { TransactionTableHead } from '~/components/TransactionTableHead';
import { TransactionTableRow } from '~/components/TransactionTableRow';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletBalance } from '~/components/WalletBalance';
import { WalletDetails } from '~/components/WalletDetails';
import { sdk } from '~/lib/sdk';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';

import { FaucetButton } from './components/FaucetButton';
import { WalletReceiveDialog } from './components/WalletReceiveDialog';

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
    sdk.listTransactions({ walletIds: [id] }),
  ]);

  return {
    balances: (balancesRes?.data?.tokenBalances ?? []) as WalletTokenBalance[],
    wallet: walletRes?.data?.wallet as Wallet,
    transactions: (transactionsRes?.data?.transactions ?? []) as Transaction[],
  };
}

export default function WalletBalancePage() {
  const { id } = useParams();
  const { balances, wallet, transactions } = useLoaderData<typeof loader>();

  if (!id) {
    return null;
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>
          <p>ID: {id}</p>
        </div>
        <FaucetButton wallet={wallet} />
      </header>

      <Card className="p-4">
        <WalletDetails wallet={wallet}>
          <div className="flex space-x-3">
            <WalletReceiveDialog wallet={wallet} />
            <Button>
              <ArrowUp /> Send
            </Button>
          </div>
        </WalletDetails>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Balances</h2>

        <div className="space-y-4">
          {balances.length === 0 && <p>Wallet is empty</p>}

          {balances.map((balance) => (
            <div key={balance.token.id}>
              <WalletBalance balance={balance} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transactions</h2>

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
