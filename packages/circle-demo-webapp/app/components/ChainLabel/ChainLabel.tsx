import { ChainIcon } from '~/components/ChainIcon';
import { Blockchain } from '~/lib/constants';

export interface ChainSelectProps {
  /** The blockchain network */
  blockchain: string;
}

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
      <ChainIcon blockchain={blockchain} />

      <span>{BLOCKCHAIN_LABELS[blockchain]}</span>
    </p>
  );
}
