import { BalanceChangeBadge } from '~/components/BalanceChangeBadge';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card } from '~/components/ui/card';
import { UsdcIcon } from '~/components/UsdcIcon';
import { formatBalance } from '~/lib/formatBalance';
import { getInitials } from '~/lib/getInitials';

import { DonutChart } from './components/DonutChart';
import { MenuButton } from './components/MenuButton';

/** User's information in the wallet. */
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
    <Card className="p-4 flex items-center gap-6">
      <div className="flex-shrink-0 max-w-[30%]">
        <DonutChart />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-500">{user.name}</p>
            </div>
          </div>

          <MenuButton />
        </div>
        <p className="mt-4 text-sm text-gray-500">Current balance</p>

        <div className="mt-1 flex items-center gap-2">
          <UsdcIcon size={24} />
          <span className="text-2xl font-semibold text-gray-900">
            {formatBalance(currentBalance)}
          </span>

          {previousBalance ? (
            <div className="ml-auto">
              <BalanceChangeBadge
                currentBalance={currentBalance}
                previousBalance={previousBalance}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
