import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { ArrowDown, ArrowUp } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletBalance } from '~/components/WalletBalance';
import { WalletHeader } from '~/components/WalletHeader';
import { sdk } from '~/lib/sdk';

import { FaucetButton } from './components/FaucetButton';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error('Wallet ID is required');
  }

  const [balances, wallet] = await Promise.all([
    sdk.wallet.balance({
      id,
      includeAll: true,
    }),
    sdk.wallet.get(id),
  ]);

  return {
    balances,
    wallet,
  };
}

export default function WalletBalancePage() {
  const { id } = useParams();
  const { balances, wallet } = useLoaderData<typeof loader>();

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
        <WalletHeader wallet={wallet}>
          <div className="flex space-x-3">
            <Button variant="outline">
              <ArrowDown /> Receive
            </Button>
            <Button>
              <ArrowUp /> Send
            </Button>
          </div>
        </WalletHeader>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Balances</h2>

        <div className="space-y-4">
          {balances.map((balance) => (
            <div key={balance.token.id}>
              <WalletBalance balance={balance} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
