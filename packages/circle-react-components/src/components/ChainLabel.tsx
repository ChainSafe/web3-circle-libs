import { NetworkIcon } from '@web3icons/react';

import { Blockchain } from '../lib/constants';

export interface ChainSelectProps {
  /** The blockchain network */
  blockchain: string;
}

const BLOCKCHAIN_TO_ICON_MAP: Record<string, string> = {
  [Blockchain.ArbSepolia]: 'arbitrum',
  [Blockchain.Arb]: 'arbitrum',
  [Blockchain.AvaxFuji]: 'avalanche',
  [Blockchain.Avax]: 'avalanche',
  [Blockchain.EthSepolia]: 'ethereum',
  [Blockchain.Eth]: 'ethereum',
  [Blockchain.EvmTestnet]: '',
  [Blockchain.Evm]: '',
  [Blockchain.MaticAmoy]: 'polygon',
  [Blockchain.Matic]: 'polygon',
  [Blockchain.NearTestnet]: 'near-protocol',
  [Blockchain.Near]: 'near-protocol',
  [Blockchain.SolDevnet]: 'solana',
  [Blockchain.Sol]: 'solana',
};

const BLOCKCHAIN_LABELS: Record<string, string> = {
  [Blockchain.ArbSepolia]: 'Arbitrum Sepolia',
  [Blockchain.Arb]: 'Arbitrum',
  [Blockchain.AvaxFuji]: 'Avalanche Fuji',
  [Blockchain.Avax]: 'Avalanche',
  [Blockchain.EthSepolia]: 'Ethereum Sepolia',
  [Blockchain.Eth]: 'Ethereum',
  [Blockchain.EvmTestnet]: '',
  [Blockchain.Evm]: '',
  [Blockchain.MaticAmoy]: 'Polygon Amoy',
  [Blockchain.Matic]: 'Polygon',
  [Blockchain.NearTestnet]: 'NEAR Testnet',
  [Blockchain.Near]: 'NEAR',
  [Blockchain.SolDevnet]: 'Solana Devnet',
  [Blockchain.Sol]: 'Solana',
};

/** A label with an icon and text to identify a blockchain network */
export function ChainLabel({ blockchain }: ChainSelectProps) {
  return (
    <p className="text-sm text-muted-foreground flex items-center space-x-2">
      <NetworkIcon
        network={BLOCKCHAIN_TO_ICON_MAP[blockchain]}
        size={20}
        variant="branded"
      />
      <span>{BLOCKCHAIN_LABELS[blockchain]}</span>
    </p>
  );
}
