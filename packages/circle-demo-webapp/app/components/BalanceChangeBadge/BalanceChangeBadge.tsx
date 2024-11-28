import { ArrowDown, ArrowUp } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';

export interface BalanceChangeBadgeProps {
  /** The current balance of the wallet. */
  currentBalance: bigint;

  /** The previous balance of the wallet. Used to display the balance change badge. */
  previousBalance: bigint;
}

export function BalanceChangeBadge({
  currentBalance,
  previousBalance,
}: BalanceChangeBadgeProps) {
  if (currentBalance === previousBalance) {
    return (
      <Badge className={'bg-gray-500 pointer-events-none hover:bg-transparent'}>0%</Badge>
    );
  }

  const isBalanceIncreased = currentBalance > previousBalance;

  // Percentage difference calculation
  const difference = Number(
    ((currentBalance - previousBalance) * BigInt(100)) / previousBalance,
  );

  const badgeColor = isBalanceIncreased
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';

  return (
    <Badge className={cn(badgeColor, 'px-1 pointer-events-none hover:bg-transparent')}>
      {isBalanceIncreased ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      <span className="ml-1">{`${difference.toFixed(1)}%`}</span>
    </Badge>
  );
}
