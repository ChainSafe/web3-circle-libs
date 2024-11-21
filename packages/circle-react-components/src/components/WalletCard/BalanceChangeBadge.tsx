import { Badge } from '@/components/ui/badge';

export interface BalanceChangeBadgeProps {
  /** The current balance of the wallet. */
  currentBalance: bigint;

  /** The previous balance of the wallet. Used to display the balance change badge. */
  previousBalance?: bigint;
}

export function BalanceChangeBadge({
  currentBalance,
  previousBalance,
}: BalanceChangeBadgeProps) {
  return <Badge>Badge</Badge>;
}
