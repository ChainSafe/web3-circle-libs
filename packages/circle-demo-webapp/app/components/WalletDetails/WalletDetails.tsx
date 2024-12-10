import type { Wallet } from 'web3-circle-sdk';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

export interface WalletDetailsProps {
  wallet: Wallet;
  children?: React.ReactNode;
}

export function WalletDetails({ wallet, children }: WalletDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Wallet Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm">Name</Label>
          <p className="text-base font-medium">{wallet.name}</p>
        </div>

        <div>
          <Label className="text-sm">Blockchain</Label>
          <p className="text-base">{wallet.blockchain}</p>
        </div>

        <div>
          <Label className="text-sm">Address</Label>
          <p className="text-sm break-all">{wallet.address}</p>
        </div>

        <div>
          <Label className="text-sm">State</Label>{' '}
          <Badge variant={wallet.state === 'LIVE' ? 'default' : 'secondary'}>
            {wallet.state}
          </Badge>
        </div>

        <div>
          <Label className="text-sm">Account Type</Label>{' '}
          <Badge variant={wallet.accountType === 'EOA' ? 'default' : 'secondary'}>
            {wallet.accountType}
          </Badge>
        </div>

        {children ?? <div>{children}</div>}
      </CardContent>
    </Card>
  );
}
