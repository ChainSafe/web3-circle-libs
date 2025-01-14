import { SelectProps } from '@radix-ui/react-select';

import { ChainIcon } from '~/components/ChainIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Blockchain } from '~/lib/constants';

const BLOCKCHAIN_LABELS: Record<string, string> = {
  [Blockchain.ArbSepolia]: 'Arbitrum Sepolia',
  [Blockchain.AvaxFuji]: 'Avalanche Fuji',
  [Blockchain.EthSepolia]: 'Ethereum Sepolia',
  [Blockchain.MaticAmoy]: 'Polygon Amoy',
  [Blockchain.NearTestnet]: 'NEAR Testnet',
  [Blockchain.SolDevnet]: 'Solana Devnet',
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
              <ChainIcon blockchain={blockchain} />
              <span>{BLOCKCHAIN_LABELS[blockchain]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
