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
  [Blockchain.Arb]: 'Arbitrum',
  [Blockchain.Avax]: 'Avalanche',
  [Blockchain.Eth]: 'Ethereum',
  [Blockchain.Matic]: 'Polygon',
  [Blockchain.Near]: 'NEAR',
  [Blockchain.Sol]: 'Solana',
};

export type ChainSelectProps = Omit<SelectProps, 'children'> & { placeholder?: string };

/** A dropdown select menu to choose a mainnet blockchain network */
export function ChainSelect({ ...props }: ChainSelectProps) {
  const { placeholder = 'Select network', ...other } = props;
  return (
    <Select {...other}>
      <SelectTrigger className="w-full max-w-md">
        <SelectValue placeholder={placeholder} />
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
