import { CheckCircle } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { Button } from '~/components/ui/button';

/**
 * Props for the SuccessMessage component
 */
export interface SuccessMessageProps extends PropsWithChildren {
  /**
   * Optional callback function to handle closing the message
   * When provided, displays a close button at the bottom
   */
  onClose?: () => void;

  /**
   * The main heading text displayed below the success icon
   * Should be concise and clearly indicate the successful action
   */
  title: string;

  /**
   * Optional children elements rendered below the title
   * Typically used for additional details or next steps
   */
  children?: React.ReactNode;
}

/**
 * Displays a success confirmation message with consistent styling
 *
 * Features:
 * - Large success icon with green accent colors
 * - Prominent title text for clear communication
 * - Optional details/description as children
 * - Optional close button for dismissing the message
 */
export function SuccessMessage({ onClose, title, children }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-green-600 p-1 border-green-500 border-8 bg-opacity-5 border-opacity-5">
        <CheckCircle className="text-green-600" />
      </div>
      <h1 className="text-center mt-8 text-lg font-semibold">{title}</h1>
      <div className="text-center mt-8 text-gray-400">{children}</div>

      {typeof onClose === 'function' && (
        <div className="text-center mt-8">
          <Button onClick={onClose}>Close</Button>
        </div>
      )}
    </div>
  );
}
