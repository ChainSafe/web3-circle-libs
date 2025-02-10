import type { Blockchain } from '@circle-fin/developer-controlled-wallets';
import {
  NetworkArbitrumOne,
  NetworkPolygon,
  NetworkNearProtocol,
  NetworkAvalanche,
  NetworkSolana,
  NetworkEthereum,
  NetworkUnichain,
  type IconComponentProps,
} from '@web3icons/react';

/**
 * Props for the ChainIcon component
 */
export interface ChainIconProps extends IconComponentProps {
  /**
   * The blockchain network to display an icon for
   * Supports all networks from Circle's API including testnet variants
   */
  blockchain: Blockchain;
}

const BlockchainToIconMap: Record<Blockchain, React.ComponentType<IconComponentProps>> = {
  'ARB-SEPOLIA': NetworkArbitrumOne,
  ARB: NetworkArbitrumOne,
  'AVAX-FUJI': NetworkAvalanche,
  AVAX: NetworkAvalanche,
  'ETH-SEPOLIA': NetworkEthereum,
  ETH: NetworkEthereum,
  'EVM-TESTNET': NetworkEthereum,
  EVM: NetworkEthereum,
  'MATIC-AMOY': NetworkPolygon,
  MATIC: NetworkPolygon,
  'NEAR-TESTNET': NetworkNearProtocol,
  NEAR: NetworkNearProtocol,
  'SOL-DEVNET': NetworkSolana,
  SOL: NetworkSolana,
  'UNI-SEPOLIA': NetworkUnichain,
} as const;

/**
 * Displays a branded icon for a given blockchain network
 *
 * Features:
 * - Uses specific network icons from @web3icons/react
 * - Supports all Circle-supported networks including testnets
 */
export function ChainIcon({ blockchain, ...props }: ChainIconProps) {
  const Icon = BlockchainToIconMap[blockchain];

  if (!Icon) {
    return null;
  }

  return <Icon size={20} variant="branded" {...props} />;
}
