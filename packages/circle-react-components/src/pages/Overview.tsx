import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WalletCard } from '@/components/WalletCard';

function PageHeader() {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Wallet Details</h1>
        <a href="/overview" className="text-gray-500 hover:text-gray-700">
          ← Back to Overview
        </a>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline">Invest</Button>
        <Button variant="outline">Receive</Button>
        <Button>Send</Button>
      </div>
    </header>
  );
}

export function Overview() {
  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="w-full">
        <Card>Full-width card</Card>
      </div>
    </div>
  );
}
