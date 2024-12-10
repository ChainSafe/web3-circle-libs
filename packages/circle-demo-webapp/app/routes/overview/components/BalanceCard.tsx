import { Card } from '~/components/ui/card';
import { UsdcIcon } from '~/components/UsdcIcon';
import { formatBalance } from '~/lib/formatBalance';

export interface BalanceCardProps {
  balance: bigint;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500">Your balance (USDC)</p>

      <div className="mt-4 flex items-center gap-3">
        <UsdcIcon size={32} />
        <span className="text-3xl font-bold text-gray-900">{formatBalance(balance)}</span>
      </div>
    </Card>
  );
}
