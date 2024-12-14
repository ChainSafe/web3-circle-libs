import { SelectProps } from '@radix-ui/react-select';
import { BLOCKCHAIN } from 'web3-circle-sdk';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const BLOCKCHAIN_LABELS: Record<string, string> = {
  [BLOCKCHAIN.ARB_SEPOLIA]: 'Arbitrum Sepolia Testnet',
  [BLOCKCHAIN.ARB]: 'Arbitrum Mainnet',
  [BLOCKCHAIN.AVAX_FUJI]: 'Avalanche Fuji Testnet',
  [BLOCKCHAIN.AVAX]: 'Avalanche Mainnet',
  [BLOCKCHAIN.ETH_SEPOLIA]: 'Ethereum Sepolia Testnet',
  [BLOCKCHAIN.ETH]: 'Ethereum Mainnet',
  [BLOCKCHAIN.MATIC_AMOY]: 'Polygon Amoy',
  [BLOCKCHAIN.MATIC]: 'Polygon Mainnet',
  [BLOCKCHAIN.NEAR_TESTNET]: 'NEAR Testnet',
  [BLOCKCHAIN.NEAR]: 'NEAR Mainnet',
  [BLOCKCHAIN.SOL_DEVNET]: 'Solana Devnet',
  [BLOCKCHAIN.SOL]: 'Solana Mainnet',
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
