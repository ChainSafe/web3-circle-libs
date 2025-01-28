import { Blockchain } from '@circle-fin/developer-controlled-wallets';
import { SelectProps } from '@radix-ui/react-select';
import { FieldError } from 'react-hook-form';

import { cn } from '~/lib/utils';

import { ChainIcon } from '../ChainIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type ChainSelectInternalProps = Omit<SelectProps, 'children'> & {
  placeholder?: string;
  error?: FieldError;
  blockchainLabels: Record<string, string>;
};

/** Internal component for blockchain network selection */
export function ChainSelectInternal({
  error,
  placeholder = 'Select network',
  blockchainLabels,
  ...props
}: ChainSelectInternalProps) {
  return (
    <Select {...props}>
      <SelectTrigger
        className={cn('w-full max-w-md', error ? 'border border-destructive' : '')}
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
