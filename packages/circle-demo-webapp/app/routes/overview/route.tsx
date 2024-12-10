import { ActionFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { WalletCard } from '~/components/WalletCard';
import { sdk } from '~/lib/sdk';

import { BalanceCard } from './components/BalanceCard';
import { PageHeader } from './components/PageHeader';
import { RecentTransactionsCard } from './components/RecentTransactionsCard';
import { WalletsCard } from './components/WalletsCard';

export async function loader() {
  const walletSets = await sdk.walletSet.list();
  return walletSets.length > 0 ? walletSets[0] : null;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  console.log(body);

  return null;
}

export default function Overview() {
  const walletSet = useLoaderData<typeof loader>();

  if (!walletSet) {
    return (
      <div className="space-y-6">
        <h2>No wallet set</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="w-full">
        <BalanceCard balance={BigInt(1000000)} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Active Wallets</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <WalletCard
            title="Interop Wallet"
            user={{ name: 'Rob McIntosh', avatar: 'https://github.com/shadcn.png' }}
            currentBalance={BigInt(121000)}
            previousBalance={BigInt(100000)}
          />
          <WalletCard
            title="R&D Wallet"
            user={{ name: 'Theresa Lambert', avatar: 'https://github.com/chainsafe.png' }}
            currentBalance={BigInt(110000)}
            previousBalance={BigInt(120000)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WalletsCard walletSet={walletSet} />
        </div>

        <RecentTransactionsCard />
      </div>
    </div>
  );
}
