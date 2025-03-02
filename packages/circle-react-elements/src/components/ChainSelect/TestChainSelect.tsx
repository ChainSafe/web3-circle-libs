import { SelectProps } from '@radix-ui/react-select';

import { ChainSelectInternal } from '../ChainSelect/ChainSelectInternal';

const BLOCKCHAIN_LABELS: Record<string, string> = {
  'ARB-SEPOLIA': 'Arbitrum Sepolia',
  'AVAX-FUJI': 'Avalanche Fuji',
  'ETH-SEPOLIA': 'Ethereum Sepolia',
  'MATIC-AMOY': 'Polygon Amoy',
  'NEAR-TESTNET': 'NEAR Testnet',
  'SOL-DEVNET': 'Solana Devnet',
  'UNI-SEPOLIA': 'Unichain Sepolia',
};

export type TestChainSelectProps = Omit<SelectProps, 'children'> & {
  /**
   * Optional placeholder text shown when no network is selected
   */
  placeholder?: string;
  /**
   * Optional form field error. When true, adds a red border to indicate validation errors
   */
  isError?: boolean;
};

/** A dropdown select menu to choose a test blockchain network */
export function TestChainSelect(props: TestChainSelectProps) {
  return <ChainSelectInternal {...props} blockchainLabels={BLOCKCHAIN_LABELS} />;
}
