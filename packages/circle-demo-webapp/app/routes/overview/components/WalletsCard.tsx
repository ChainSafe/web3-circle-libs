import { WalletSet } from 'web3-circle-sdk';

import { Badge } from '~/components/ui/badge';
import { Card } from '~/components/ui/card';
import { formatBalance } from '~/lib/formatBalance';

import { MenuButton } from './MenuButton';
import { NewWalletDialog } from './NewWalletDialog';

interface WalletRowProps {
  gradient: string;
  name: string;
  address: string;
  leaderName: string;
  leaderAvatar: string;
  balance: bigint;
}

function WalletRow({
  gradient,
  name,
  address,
  leaderName,
  leaderAvatar,
  balance,
}: WalletRowProps) {
  return (
    <tr className="border-b last:border-0 border-gray-200">
      <td className="flex items-center gap-3 py-4">
        <div className="w-10 h-10 rounded-full" style={{ background: gradient }} />
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
      </td>

      <td className="text-left">
        <div className="flex items-center gap-3">
          <img src={leaderAvatar} alt={leaderName} className="w-8 h-8 rounded-full" />
          <p className="text-sm text-gray-900">{leaderName}</p>
        </div>
      </td>

      <td className="text-right">
        <p className="text-sm text-green-600">{formatBalance(balance)}</p>
      </td>

      <td className="text-right">
        <MenuButton />
      </td>
    </tr>
  );
}

const wallets = [
  {
    gradient: 'linear-gradient(135deg, #7DE2DC, #A5ECA7)',
    name: 'Gaming Wallet',
    address: '0xF89b...2AdC58',
    leaderName: 'Theresa Lambert',
    leaderAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    balance: BigInt(323221),
  },
  {
    gradient: 'linear-gradient(135deg, #7A7CF6, #9A73EA)',
    name: 'DevTooling Wallet',
    address: '0xAc67...C02B50',
    leaderName: 'Joseph Clinton',
    leaderAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    balance: BigInt(1404),
  },
  {
    gradient: 'linear-gradient(135deg, #FA8C7A, #FDA87A)',
    name: 'Protocol Wallet',
    address: '0xBf22...D91V67',
    leaderName: 'Bill Mos',
    leaderAvatar: 'https://randomuser.me/api/portraits/men/30.jpg',
    balance: BigInt(221335),
  },
];

interface WalletsCardProps {
  walletSet: WalletSet;
}

export function WalletsCard({ walletSet }: WalletsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Your Wallets</h2>
          <Badge className="bg-green-100 text-green-700 px-1 pointer-events-none hover:bg-transparent">
            10/20 Compliant
          </Badge>
        </div>

        <NewWalletDialog walletSet={walletSet} />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
            <th className="py-2 font-normal">Wallet</th>
            <th className="py-2 font-normal">Program Leader</th>
            <th className="py-2 font-normal text-right">Balance (USDC)</th>
          </tr>
        </thead>

        <tbody>
          {wallets.map((wallet, index) => (
            <WalletRow key={index} {...wallet} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}
