import { ArrowUpRight, CheckCircle } from 'lucide-react';

import { Button } from '~/components/ui/button';

export interface NotificationProps {
  /** The wallet */
  onClose?: () => void;
  description: string | React.ReactElement;
  externalLink?: string;
  title: string;
}

/**
 * Helpers for obtaining a wallet's on-chain address:
 * a QR code that encodes the address and elements for viewing the address and copying it to the clipboard
 */
export function Notification({
  onClose,
  title,
  description,
  externalLink,
}: NotificationProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-green-200 p-1 border-green-100 border-8">
        <CheckCircle className="text-green-600" />
      </div>
      <h1 className="text-center mt-8 text-lg font-bold">{title}</h1>
      <div className="text-center mt-8 text-gray-400">
        {description}
        {externalLink && (
          <a
            className="text-primary"
            href={externalLink}
            target="_blank"
            rel="noreferrer"
          >
            <ArrowUpRight className="inline" />
          </a>
        )}
      </div>

      {typeof onClose === 'function' && (
        <div className="text-center mt-8">
          <Button onClick={onClose}>Close</Button>
        </div>
      )}
    </div>
  );
}
