import { Badge } from '~/components/ui/badge';
import { formatDate } from '~/lib/format';
import { ElementsWalletSet } from '~/lib/types';

export interface WalletSetDetailsProps {
  /** The wallet set */
  walletSet: ElementsWalletSet;
  /** Child components to associate with the wallet set */
  children?: React.ReactNode;
}

/** The details of a wallet set */
export function WalletSetDetails({ walletSet, children }: WalletSetDetailsProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 space-y-4">
        <p className="text-lg font-medium text-foreground">
          {walletSet.name ?? 'Unnamed Wallet Set'}
        </p>

        <p className="text-xs text-muted-foreground">
          Created Date: {formatDate(walletSet.createDate)}
        </p>

        <Badge
          variant="secondary"
          className="font-normal text-green-600 dark:text-green-500"
        >
          Updated Date: {formatDate(walletSet.updateDate)}
        </Badge>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
