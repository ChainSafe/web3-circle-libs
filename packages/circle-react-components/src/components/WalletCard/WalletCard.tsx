import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { formatBalance } from '@/lib/formatBalance';
import { getInitials } from '@/lib/getInitials';

import { BalanceChangeBadge } from './BalanceChangeBadge';
import { DonutChart } from './DonutChart';

/**  User's information in the wallet. */
export interface WalletUser {
  /** The full name of the user. */
  name: string;

  /** The URL of the user's avatar image. */
  avatar: string;
}

/**
 * Props for the WalletCard component.
 */
export interface WalletCardProps {
  /** The title of the wallet. */
  title: string;

  /** User information associated with the wallet, including name and avatar. */
  user: WalletUser;

  /** The current balance of the wallet. */
  currentBalance: bigint;

  /** The previous balance of the wallet. Used to display the balance change badge. */
  previousBalance?: bigint;
}

export function WalletCard({
  title,
  user,
  currentBalance,
  previousBalance,
}: WalletCardProps) {
  return (
    <Card>
      <CardContent>
        <DonutChart />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-gray-500">{user.name}</p>
          </div>
          <p className="mt-4 text-sm text-gray-500">Current balance</p>

          <div className="balance-display">
            <span className="balance-icon">💲</span>
            <span className="balance-amount">{formatBalance(currentBalance)}</span>
          </div>

          {previousBalance ? (
            <BalanceChangeBadge
              currentBalance={currentBalance}
              previousBalance={previousBalance}
            />
          ) : null}
        </div>

        <button className="text-gray-400 hover:text-gray-600" aria-label="Menu">
          &#8226;&#8226;&#8226;
        </button>
      </CardContent>
    </Card>
  );
}
