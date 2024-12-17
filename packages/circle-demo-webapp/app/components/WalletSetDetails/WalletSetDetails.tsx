import { formatDate } from '~/lib/format';
import { WalletSet } from '~/lib/types';

export interface WalletSetDetailsProps {
  /** The wallet set */
  walletSet: WalletSet;
  /** Child components to associate with the wallet set */
  children?: React.ReactNode;
}

/** The details of a wallet set */
export function WalletSetDetails({ walletSet, children }: WalletSetDetailsProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          Name: {walletSet.name ?? 'Unnamed Wallet Set'}
        </p>

        <p className="text-sm text-gray-500">Custody Type: {walletSet.custodyType}</p>

        <p className="text-sm text-gray-500">
          Created: {formatDate(walletSet.createDate)}
        </p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
