import { SelectProps } from '@radix-ui/react-select';
import { NetworkIcon } from '@web3icons/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Blockchain } from '~/lib/constants';

const BLOCKCHAIN_TO_ICON_MAP: Record<string, string> = {
  [Blockchain.Arb]: 'arbitrum',
  [Blockchain.Avax]: 'avalanche',
  [Blockchain.Eth]: 'ethereum',
  [Blockchain.Matic]: 'polygon',
  [Blockchain.Near]: 'near-protocol',
  [Blockchain.Sol]: 'solana',
};

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
  const { placeholder = 'Select Network', ...other } = props;
  return (
    <Select {...other}>
      <SelectTrigger className="w-full max-w-md">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(BLOCKCHAIN_LABELS).map((blockchain) => (
          <SelectItem key={blockchain} value={blockchain}>
            <div className="text-sm text-muted-foreground flex items-center space-x-2 pr-4">
              <NetworkIcon
                network={BLOCKCHAIN_TO_ICON_MAP[blockchain]}
                size={20}
                variant="branded"
              />
              <span>{BLOCKCHAIN_LABELS[blockchain]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
