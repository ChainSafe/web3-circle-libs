import { NetworkIcon } from '@web3icons/react';
import { BLOCKCHAIN } from 'web3-circle-sdk';

export interface ChainSelectProps {
  /** The blockchain network */
  blockchain: BLOCKCHAIN;
}

const BLOCKCHAIN_TO_ICON_MAP = {
  [BLOCKCHAIN.ARB_SEPOLIA]: 'arbitrum',
  [BLOCKCHAIN.ARB]: 'arbitrum',
  [BLOCKCHAIN.AVAX_FUJI]: 'avalanche',
  [BLOCKCHAIN.AVAX]: 'avalanche',
  [BLOCKCHAIN.ETH_SEPOLIA]: 'ethereum',
  [BLOCKCHAIN.ETH]: 'ethereum',
  [BLOCKCHAIN.EVM_TESTNET]: '',
  [BLOCKCHAIN.EVM]: '',
  [BLOCKCHAIN.MATIC_AMOY]: 'polygon',
  [BLOCKCHAIN.MATIC]: 'polygon',
  [BLOCKCHAIN.NEAR_TESTNET]: 'near-protocol',
  [BLOCKCHAIN.NEAR]: 'near-protocol',
  [BLOCKCHAIN.SOL_DEVNET]: 'solana',
  [BLOCKCHAIN.SOL]: 'solana',
};

const BLOCKCHAIN_LABELS = {
  [BLOCKCHAIN.ARB_SEPOLIA]: 'Arbitrum Sepolia Testnet',
  [BLOCKCHAIN.ARB]: 'Arbitrum Mainnet',
  [BLOCKCHAIN.AVAX_FUJI]: 'Avalanche Fuji Testnet',
  [BLOCKCHAIN.AVAX]: 'Avalanche Mainnet',
  [BLOCKCHAIN.ETH_SEPOLIA]: 'Ethereum Sepolia Testnet',
  [BLOCKCHAIN.ETH]: 'Ethereum Mainnet',
  [BLOCKCHAIN.EVM_TESTNET]: '',
  [BLOCKCHAIN.EVM]: '',
  [BLOCKCHAIN.MATIC_AMOY]: 'Polygon Amoy',
  [BLOCKCHAIN.MATIC]: 'Polygon Mainnet',
  [BLOCKCHAIN.NEAR_TESTNET]: 'NEAR Testnet',
  [BLOCKCHAIN.NEAR]: 'NEAR Mainnet',
  [BLOCKCHAIN.SOL_DEVNET]: 'Solana Devnet',
  [BLOCKCHAIN.SOL]: 'Solana Mainnet',
};

/** A label with an icon and text to identify a blockchain network */
export function ChainLabel({ blockchain }: ChainSelectProps) {
  return (
    <p className="text-sm text-gray-500 flex items-center space-x-2">
      <NetworkIcon
        network={BLOCKCHAIN_TO_ICON_MAP[blockchain]}
        size={16}
        variant="branded"
      />
      <span>{BLOCKCHAIN_LABELS[blockchain]}</span>
    </p>
  );
}
