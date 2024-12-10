import { Wallet } from 'web3-circle-sdk';

import { Card } from '~/components/ui/card';

import { NewWalletDialog } from './NewWalletDialog';

function WalletRow(props: Wallet) {
  console.log('wallet', props);

  return (
    <tr className="border-b last:border-0 border-gray-200">
      <td className="flex items-center gap-3 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900">{props.name}</p>
          <p className="text-sm text-gray-500">{props.address}</p>
        </div>
      </td>

      <td>
        <p className="text-sm">{props.blockchain}</p>
      </td>

      <td className="text-right">XX</td>
    </tr>
  );
}

interface WalletsCardProps {
  walletSetId: string;
  wallets: Wallet[];
}

export function WalletsCard({ walletSetId, wallets }: WalletsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Wallets</h2>
        </div>

        <NewWalletDialog walletSetId={walletSetId} />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
            <th className="py-2 font-normal">Wallet</th>
            <th className="py-2 font-normal">Chains</th>
            <th className="py-2 font-normal text-right">Balance (USDC)</th>
          </tr>
        </thead>

        <tbody>
          {wallets.map((wallet) => (
            <WalletRow key={wallet.id} {...wallet} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}
