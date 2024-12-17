import { NetworkIcon } from '@web3icons/react';

import { Blockchain } from '~/lib/constants';

export interface ChainSelectProps {
  /** The blockchain network */
  blockchain: string;
}

const BLOCKCHAIN_TO_ICON_MAP = {
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

const BLOCKCHAIN_LABELS = {
  [Blockchain.ArbSepolia]: 'Arbitrum Sepolia Testnet',
  [Blockchain.Arb]: 'Arbitrum Mainnet',
  [Blockchain.AvaxFuji]: 'Avalanche Fuji Testnet',
  [Blockchain.Avax]: 'Avalanche Mainnet',
  [Blockchain.EthSepolia]: 'Ethereum Sepolia Testnet',
  [Blockchain.Eth]: 'Ethereum Mainnet',
  [Blockchain.EvmTestnet]: '',
  [Blockchain.Evm]: '',
  [Blockchain.MaticAmoy]: 'Polygon Amoy',
  [Blockchain.Matic]: 'Polygon Mainnet',
  [Blockchain.NearTestnet]: 'NEAR Testnet',
  [Blockchain.Near]: 'NEAR Mainnet',
  [Blockchain.SolDevnet]: 'Solana Devnet',
  [Blockchain.Sol]: 'Solana Mainnet',
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
