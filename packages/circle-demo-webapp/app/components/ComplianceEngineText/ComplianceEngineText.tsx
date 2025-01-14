import { Badge } from '~/components/ui/badge';

export interface ComplianceEngineTextProps {
  result: boolean;
}

export function ComplianceEngineText({ result }: ComplianceEngineTextProps) {
  return result ? (
    <Badge variant="accent" className="font-normal text-green-600 dark:text-green-500">
      Approved by Circle Compliance Engine ✓
    </Badge>
  ) : (
    <Badge variant="accent" className="font-normal text-red-500 dark:text-red-400">
      Denied by Circle Compliance Engine ✘
    </Badge>
  );
}
