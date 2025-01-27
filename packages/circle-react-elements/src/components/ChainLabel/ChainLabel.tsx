import type { Blockchain } from '@circle-fin/developer-controlled-wallets';

import { ChainIcon } from '../ChainIcon';

export interface ChainLabelProps {
  /** The blockchain network */
  blockchain: Blockchain;
}

const BlockchainLabelMap: Record<Blockchain, string> = {
  'ARB-SEPOLIA': 'Arbitrum Sepolia',
  ARB: 'Arbitrum',
  'AVAX-FUJI': 'Avalanche Fuji',
  AVAX: 'Avalanche',
  'ETH-SEPOLIA': 'Ethereum Sepolia',
  ETH: 'Ethereum',
  'EVM-TESTNET': '',
  EVM: '',
  'MATIC-AMOY': 'Polygon Amoy',
  MATIC: 'Polygon',
  'NEAR-TESTNET': 'NEAR Testnet',
  NEAR: 'NEAR',
  'SOL-DEVNET': 'Solana Devnet',
  SOL: 'Solana',
  'UNI-SEPOLIA': 'Uni Sepolia',
};

/** A label with an icon and text to identify a blockchain network */
export function ChainLabel({ blockchain }: ChainLabelProps) {
  return (
    <p className="text-sm text-muted-foreground flex items-center space-x-2">
      <ChainIcon blockchain={blockchain} />

      <span>{BlockchainLabelMap[blockchain]}</span>
    </p>
  );
}
