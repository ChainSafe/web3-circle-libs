import { SelectProps } from '@radix-ui/react-select';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { BLOCKCHAIN } from '~/lib/types';

const BLOCKCHAIN_LABELS: Record<BLOCKCHAIN, string> = {
  [BLOCKCHAIN.ETH]: 'Ethereum Mainnet',
  [BLOCKCHAIN.ETH_SEPOLIA]: 'Ethereum Sepolia Testnet',
  [BLOCKCHAIN.AVAX]: 'Avalanche Mainnet',
  [BLOCKCHAIN.AVAX_FUJI]: 'Avalanche Fuji Testnet',
  [BLOCKCHAIN.MATIC]: 'Polygon Mainnet',
  [BLOCKCHAIN.MATIC_AMOY]: 'Polygon Amoy',
  [BLOCKCHAIN.SOL]: 'Solana Mainnet',
  [BLOCKCHAIN.SOL_DEVNET]: 'Solana Devnet',
  [BLOCKCHAIN.ARB]: 'Arbitrum Mainnet',
  [BLOCKCHAIN.ARB_SEPOLIA]: 'Arbitrum Sepolia Testnet',
  [BLOCKCHAIN.NEAR]: 'NEAR Mainnet',
  [BLOCKCHAIN.NEAR_TESTNET]: 'NEAR Testnet',
  [BLOCKCHAIN.EVM]: 'EVM Compatible',
  [BLOCKCHAIN.EVM_TESTNET]: 'EVM Testnet',
  [BLOCKCHAIN.UNI_SEPOLIA]: 'Uniswap Sepolia Testnet',
};

export type BlockchainSelectProps = Omit<SelectProps, 'children'>;

export function BlockchainSelect({ ...props }: BlockchainSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full max-w-md">
        <SelectValue placeholder="Select Blockchain" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(BLOCKCHAIN).map((blockchain) => (
          <SelectItem key={blockchain} value={blockchain}>
            {BLOCKCHAIN_LABELS[blockchain]} {/* Display human-friendly labels */}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
