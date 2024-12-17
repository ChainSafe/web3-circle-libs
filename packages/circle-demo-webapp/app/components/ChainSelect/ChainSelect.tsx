import { SelectProps } from '@radix-ui/react-select';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Blockchain } from '~/lib/constants';

const BLOCKCHAIN_LABELS: Record<string, string> = {
  [Blockchain.ArbSepolia]: 'Arbitrum Sepolia Testnet',
  [Blockchain.Arb]: 'Arbitrum Mainnet',
  [Blockchain.AvaxFuji]: 'Avalanche Fuji Testnet',
  [Blockchain.Avax]: 'Avalanche Mainnet',
  [Blockchain.EthSepolia]: 'Ethereum Sepolia Testnet',
  [Blockchain.Eth]: 'Ethereum Mainnet',
  [Blockchain.MaticAmoy]: 'Polygon Amoy',
  [Blockchain.Matic]: 'Polygon Mainnet',
  [Blockchain.NearTestnet]: 'NEAR Testnet',
  [Blockchain.Near]: 'NEAR Mainnet',
  [Blockchain.SolDevnet]: 'Solana Devnet',
  [Blockchain.Sol]: 'Solana Mainnet',
};

export type ChainSelectProps = Omit<SelectProps, 'children'>;

/** A dropdown select menu to choose a blockchain network */
export function ChainSelect({ ...props }: ChainSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full max-w-md">
        <SelectValue placeholder="Select Blockchain" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(BLOCKCHAIN_LABELS).map((blockchain) => (
          <SelectItem key={blockchain} value={blockchain}>
            {BLOCKCHAIN_LABELS[blockchain]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
