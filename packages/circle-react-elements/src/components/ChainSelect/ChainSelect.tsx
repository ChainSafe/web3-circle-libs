import { SelectProps } from '@radix-ui/react-select';
import { FieldError } from 'react-hook-form';

import { ChainSelectInternal } from './ChainSelectInternal';

/**
 * Mapping of supported mainnet blockchain identifiers to human-readable labels
 */
const BLOCKCHAIN_LABELS: Record<string, string> = {
  ARB: 'Arbitrum',
  AVAX: 'Avalanche',
  ETH: 'Ethereum',
  MATIC: 'Polygon',
  NEAR: 'NEAR',
  SOL: 'Solana',
};

/**
 * Props for the ChainSelect component
 * Extends Radix UI's SelectProps (excluding children)
 */
export type ChainSelectProps = Omit<SelectProps, 'children'> & {
  /**
   * Optional placeholder text shown when no network is selected
   * Displayed when no value is selected
   */
  placeholder?: string;

  /**
   * Optional form field error from react-hook-form
   * When provided, adds a red border to indicate validation errors
   */
  error?: FieldError;
};

/**
 * A dropdown select menu for choosing a mainnet blockchain network
 *
 * Features:
 * - Shows only mainnet networks (no testnets)
 * - Displays network icons alongside network names
 * - Accessible dropdown using Radix UI Select
 * - Integration with react-hook-form for validation
 * - Customizable placeholder text
 * - Consistent styling with the design system
 */
export function ChainSelect(props: ChainSelectProps) {
  return <ChainSelectInternal {...props} blockchainLabels={BLOCKCHAIN_LABELS} />;
}
