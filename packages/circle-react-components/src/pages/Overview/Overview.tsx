import { WalletCard } from '@/components/WalletCard';

import { BalanceCard } from './components/BalanceCard';
import { PageHeader } from './components/PageHeader';
import { RecentTransactionsCard } from './components/RecentTransactionsCard';
import { WalletsCard } from './components/WalletsCard';

export function Overview() {
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
        {/* Your Wallets Table */}
        <div className="lg:col-span-2">
          <WalletsCard />
        </div>

        <RecentTransactionsCard />
      </div>
    </div>
  );
}
