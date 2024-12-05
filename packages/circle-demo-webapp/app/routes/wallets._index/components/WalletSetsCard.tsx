import { Link } from '@remix-run/react';
import { WalletSet } from 'web3-circle-sdk';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

import { NewWalletSetDialog } from './NewWalletSetDialog';

function WalletSetRow(props: WalletSet) {
  return (
    <tr className="border-b last:border-0 border-gray-200">
      <td className="flex items-center gap-3 py-4">
        <p className="text-sm text-gray-900">{props.name}</p>
      </td>

      <td>
        <p className="text-sm text-gray-900">{props.custodyType}</p>
      </td>

      <td className="text-right">
        <Button variant="outline" asChild>
          <Link to={`/wallets/${props.id}`}>Show wallets</Link>
        </Button>
      </td>
    </tr>
  );
}

interface WalletSetsCardProps {
  walletSets: WalletSet[];
}

export function WalletSetsCard({ walletSets }: WalletSetsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Wallet Sets</h2>
        </div>

        <NewWalletSetDialog />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
            <th className="py-2 font-normal">Name</th>
            <th className="py-2 font-normal">Custody Type</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {walletSets.map((walletSet) => (
            <WalletSetRow key={walletSet.id} {...walletSet} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}
