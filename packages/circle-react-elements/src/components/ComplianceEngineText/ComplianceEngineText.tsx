import { Badge } from '~/components/ui/badge';

/**
 * Props for the ComplianceEngineText component
 */
export interface ComplianceEngineTextProps {
  /**
   * The compliance check result from Circle's Compliance Engine
   * true = approved, false = denied
   */
  result: boolean;
}

/**
 * Displays the result of a Circle Compliance Engine check
 *
 * Features:
 * - Shows approval/denial status with appropriate colors
 * - Uses Badge component for consistent styling
 * - Dark mode support with adjusted colors
 * - Clear visual indicators (✓/✘) for quick status recognition
 * - Accessible text colors meeting contrast requirements
 */
export function ComplianceEngineText({ result }: ComplianceEngineTextProps) {
  return result ? (
    <Badge
      variant="accent"
      className="min-h-6 font-normal text-green-600 dark:text-green-500"
    >
      Approved by Circle Compliance Engine ✓
    </Badge>
  ) : (
    <Badge
      variant="accent"
      className="min-h-6 font-normal text-red-500 dark:text-red-400"
    >
      Denied by Circle Compliance Engine ✘
    </Badge>
  );
}
