import { SelectProps } from '@radix-ui/react-select';
import { FieldError } from 'react-hook-form';

import { ChainSelectInternal } from './ChainSelectInternal';

const BLOCKCHAIN_LABELS: Record<string, string> = {
  ARB: 'Arbitrum',
  AVAX: 'Avalanche',
  ETH: 'Ethereum',
  MATIC: 'Polygon',
  NEAR: 'NEAR',
  SOL: 'Solana',
};

export type ChainSelectProps = Omit<SelectProps, 'children'> & {
  /**
   * Optional placeholder text shown when no network is selected
   */
  placeholder?: string;
  /**
   * Optional form field error from react-hook-form. When provided, adds a red border to indicate validation errors.
   */
  error?: FieldError;
};

/** A dropdown select menu to choose a mainnet blockchain network */
export function ChainSelect(props: ChainSelectProps) {
  return <ChainSelectInternal {...props} blockchainLabels={BLOCKCHAIN_LABELS} />;
}
