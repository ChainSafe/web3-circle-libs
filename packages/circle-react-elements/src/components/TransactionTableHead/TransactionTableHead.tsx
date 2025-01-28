/**
 * Props for the TransactionTableHead component
 */
export interface TransactionTableHeadProps {
  /**
   * Whether to include an Actions column in the table header
   * When true, adds an additional column for action buttons
   * @default false
   */
  withActions?: boolean;
}

/**
 * Header component for transaction table listing
 *
 * Features:
 * - Shows column headers for transaction data
 * - Includes columns for addresses, status, token, amount, and date
 * - Optional Actions column controlled by withActions prop
 * - Left-aligned text for most columns
 * - Right-aligned text for amount and date columns
 * - Consistent styling with design system
 */
export function TransactionTableHead({ withActions }: TransactionTableHeadProps) {
  return (
    <thead>
      <tr className="text-foreground text-left text-sm">
        <th className="px-4 py-2">From</th>
        <th className="px-4 py-2">To</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Token Name</th>
        <th className="px-4 py-2 text-right">Amount</th>
        <th className="px-4 py-2 text-right">Date</th>
        {withActions && <th className="py-2 text-right">Actions</th>}
      </tr>
    </thead>
  );
}
