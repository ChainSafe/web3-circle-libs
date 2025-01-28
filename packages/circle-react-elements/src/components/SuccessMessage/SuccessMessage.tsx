import { CheckCircle } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { Button } from '~/components/ui/button';

export interface SuccessMessageProps extends PropsWithChildren {
  /** onClose callback, show the close btn if exists */
  onClose?: () => void;
  /** title of the success message */
  title: string;
}

/**
 * Success message component
 */
export function SuccessMessage({ onClose, title, children }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-green-600 p-1 border-green-500 border-8 bg-opacity-5 border-opacity-5">
        <CheckCircle className="text-green-600" />
      </div>
      <h1 className="text-center mt-8 text-lg font-bold">{title}</h1>
      <div className="text-center mt-8 text-gray-400">{children}</div>

      {typeof onClose === 'function' && (
        <div className="text-center mt-8">
          <Button onClick={onClose}>Close</Button>
        </div>
      )}
    </div>
  );
}
