import { NetworkIcon } from '@web3icons/react';

import { Blockchain } from '~/lib/constants';

export interface ChainIconProps {
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

/** A label with an icon and text to identify a blockchain network */
export function ChainIcon({ blockchain }: ChainIconProps) {
  const network = BLOCKCHAIN_TO_ICON_MAP[blockchain];

  const icon = <NetworkIcon network={network} size={20} variant="branded" />;

  return network === 'arbitrum' ? (
    <span className="rounded-full bg-[#2D3649]">{icon}</span>
  ) : (
    icon
  );
}
