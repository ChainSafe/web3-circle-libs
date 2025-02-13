import { Blockchain } from '@circle-fin/developer-controlled-wallets';
import { SelectProps } from '@radix-ui/react-select';

import { cn } from '~/lib/utils';

import { ChainIcon } from '../ChainIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

/**
 * Props for the internal ChainSelect component
 * Extends Radix UI's SelectProps (excluding children)
 */
export type ChainSelectInternalProps = Omit<SelectProps, 'children'> & {
  /**
   * Optional placeholder text shown when no network is selected
   * @default "Select network"
   */
  placeholder?: string;

  /**
   * Optional form field error. When true, adds a red border to indicate validation errors
   */
  isError?: boolean;

  /**
   * Mapping of blockchain identifiers to their display labels
   * e.g. { "ETH": "Ethereum" }
   */
  blockchainLabels: Record<string, string>;
};

/**
 * Internal implementation of the blockchain network selector
 *
 * Features:
 * - Uses Radix UI's Select component for accessibility
 * - Shows network icons alongside network names
 * - Supports form validation with error states
 * - Customizable placeholder text
 * - Consistent styling with design system
 */
export function ChainSelectInternal({
  isError,
  placeholder = 'Select network',
  blockchainLabels,
  ...props
}: ChainSelectInternalProps) {
  return (
    <Select {...props}>
      <SelectTrigger
        className={cn('w-full max-w-md', isError ? 'border border-destructive' : '')}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(blockchainLabels).map((blockchain) => (
          <SelectItem key={blockchain} value={blockchain}>
            <div className="text-sm text-muted-foreground flex items-center space-x-2 pr-4">
              <ChainIcon blockchain={blockchain as Blockchain} />
              <span>{blockchainLabels[blockchain]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
