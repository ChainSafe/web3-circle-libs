import { Card } from '~/components/ui/card';
import { formatBalance } from '~/lib/formatBalance';

import { MenuButton } from './MenuButton';

interface TransactionRowProps {
  logo: string;
  title: string;
  subtitle: string;
  amount: bigint;
  isPositive: boolean;
}

function TransactionRow({
  logo,
  title,
  subtitle,
  amount,
  isPositive,
}: TransactionRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0 border-gray-200">
      <div className="flex items-center gap-3">
        <img src={logo} alt={title} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* Right Section: Amount */}
      <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? `+ ${formatBalance(amount)}` : `- ${formatBalance(amount)}`}
      </p>
    </div>
  );
}

const transactions = [
  {
    logo: 'https://github.com/chainsafe.png',
    title: 'Consulting Fee',
    subtitle: 'Chainsafe',
    amount: BigInt(3244000), // '$3,244.00',
    isPositive: true,
  },
  {
    logo: 'https://github.com/chainsafe.png',
    title: 'DAO Treasury Payment',
    subtitle: 'Arbitrum Foundation',
    amount: BigInt(2326000),
    isPositive: false,
  },
  {
    logo: 'https://github.com/chainsafe.png',
    title: 'Sprinter Consulting Fee',
    subtitle: 'Sprinter',
    amount: BigInt(140800),
    isPositive: true,
  },
  {
    logo: 'https://github.com/chainsafe.png',
    title: 'Sprinter Consulting Fee',
    subtitle: 'Sprinter',
    amount: BigInt(628000),
    isPositive: true,
  },
];

export function RecentTransactionsCard() {
  return (
    <Card className="p-6 pb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <MenuButton />
      </div>
      {transactions.map((transaction, index) => (
        <TransactionRow key={index} {...transaction} />
      ))}
    </Card>
  );
}
