import { Blockchain } from '@circle-fin/developer-controlled-wallets';
import { ChainIcon } from '@circle-libs/circle-react-elements';
import { SelectProps } from '@radix-ui/react-select';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const BLOCKCHAIN_LABELS: Record<string, string> = {
  'ARB-SEPOLIA': 'Arbitrum Sepolia',
  'AVAX-FUJI': 'Avalanche Fuji',
  'ETH-SEPOLIA': 'Ethereum Sepolia',
  'MATIC-AMOY': 'Polygon Amoy',
  'NEAR-TESTNET': 'NEAR Testnet',
  'SOL-DEVNET': 'Solana Devnet',
};

export type TestChainSelectProps = Omit<SelectProps, 'children'>;

/** A dropdown select menu to choose a test blockchain network */
export function TestChainSelect({ ...props }: TestChainSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full max-w-md">
        <SelectValue placeholder="Select test network" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(BLOCKCHAIN_LABELS).map((blockchain) => (
          <SelectItem key={blockchain} value={blockchain}>
            <div className="text-sm text-muted-foreground flex items-center space-x-2 pr-4">
              <ChainIcon blockchain={blockchain as Blockchain} />
              <span>{BLOCKCHAIN_LABELS[blockchain]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
