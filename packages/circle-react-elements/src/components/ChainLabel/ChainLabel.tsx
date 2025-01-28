import type { Blockchain } from '@circle-fin/developer-controlled-wallets';

import { ChainIcon } from '../ChainIcon';

/**
 * Props for the ChainLabel component
 */
export interface ChainLabelProps {
  /**
   * The blockchain network to display
   * Supports all networks from Circle's API including testnet variants
   */
  blockchain: Blockchain;
}

/**
 * Mapping of Circle blockchain identifiers to human-readable network names
 */
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

/**
 * Displays a blockchain network label with an icon and human-readable name
 *
 * Features:
 * - Shows network icon using ChainIcon component
 * - Displays human-readable network names (e.g. "Ethereum" instead of "ETH")
 * - Includes testnet names where applicable (e.g. "Ethereum Sepolia")
 * - Consistent styling with muted text and icon alignment
 */
export function ChainLabel({ blockchain }: ChainLabelProps) {
  return (
    <p className="text-sm text-muted-foreground flex items-center space-x-2">
      <ChainIcon blockchain={blockchain} />

      <span>{BlockchainLabelMap[blockchain]}</span>
    </p>
  );
}
