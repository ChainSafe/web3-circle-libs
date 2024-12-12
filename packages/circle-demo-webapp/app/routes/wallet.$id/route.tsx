import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { ArrowUp } from 'lucide-react';

import { TransactionDetails } from '~/components/TransactionDetails';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletBalance } from '~/components/WalletBalance';
import { WalletDetails } from '~/components/WalletDetails';
import { sdk } from '~/lib/sdk';

import { FaucetButton } from './components/FaucetButton';
import { WalletAddressDialog } from './components/WalletAddressDialog';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error('Wallet ID is required');
  }

  const [balances, wallet, transactions] = await Promise.all([
    sdk.wallet.balance({
      id,
      includeAll: true,
    }),
    sdk.wallet.get(id),
    sdk.transaction.list({ walletIds: id }),
  ]);

  return {
    balances,
    wallet,
    transactions,
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
            <WalletAddressDialog wallet={wallet} />
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

          {transactions.map((tx) => (
            <div key={tx.id}>
              <TransactionDetails transaction={tx} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
