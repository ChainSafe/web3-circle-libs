import { Badge } from '~/components/ui/badge';
import { formatDate } from '~/lib/format';
import { ElementsWalletSet } from '~/lib/types';

/**
 * Props for the WalletSetDetails component
 */
export interface WalletSetDetailsProps {
  /**
   * The wallet set data from Circle's API
   * Contains name, creation date, update date, and other metadata
   */
  walletSet: ElementsWalletSet;

  /**
   * Optional child components to render in the wallet set details
   * Useful for adding action buttons or additional information
   */
  children?: React.ReactNode;
}

/**
 * Displays detailed information about a wallet set
 *
 * Features:
 * - Shows wallet set name with fallback for unnamed sets
 * - Displays creation and update dates with formatting
 * - Update date shown in badge with status color
 * - Supports custom child components for extensibility
 * - Responsive layout with consistent spacing
 * - Uses design system components (Badge)
 * - Dark mode support with adjusted colors
 * - Muted text for secondary information
 */
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
