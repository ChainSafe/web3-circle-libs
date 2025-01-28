import type { Blockchain } from '@circle-fin/developer-controlled-wallets';
import { NetworkIcon } from '@web3icons/react';

/**
 * Props for the ChainIcon component
 */
export interface ChainIconProps {
  /**
   * The blockchain network to display an icon for
   * Supports all networks from Circle's API including testnet variants
   */
  blockchain: Blockchain;
}

/**
 * Mapping of Circle blockchain identifiers to web3icons network names
 */
const BlockchainToIconMap: Record<Blockchain, string> = {
  'ARB-SEPOLIA': 'arbitrum',
  ARB: 'arbitrum',
  'AVAX-FUJI': 'avalanche',
  AVAX: 'avalanche',
  'ETH-SEPOLIA': 'ethereum',
  ETH: 'ethereum',
  'EVM-TESTNET': '',
  EVM: '',
  'MATIC-AMOY': 'polygon',
  MATIC: 'polygon',
  'NEAR-TESTNET': 'near-protocol',
  NEAR: 'near-protocol',
  'SOL-DEVNET': 'solana',
  SOL: 'solana',
  'UNI-SEPOLIA': 'uni',
};

/**
 * Displays a branded icon for a given blockchain network
 *
 * Features:
 * - Shows branded network icons using web3icons library
 * - Supports all Circle-supported networks including testnets
 * - Consistent 20px size for all icons
 * - Uses official branded network colors
 */
export function ChainIcon({ blockchain }: ChainIconProps) {
  return (
    <NetworkIcon network={BlockchainToIconMap[blockchain]} size={20} variant="branded" />
  );
}
