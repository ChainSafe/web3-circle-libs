import { WalletDetails } from '@circle-libs/circle-react-elements';
import { Link, useLoaderData, useParams, useRevalidator } from '@remix-run/react';
import { ArrowUpRight } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { useToast } from '~/hooks/useToast';
import { formatDate } from '~/lib/format';
import { sdk } from '~/lib/sdk';
import { ElementsWallet, ElementsWalletSet } from '~/lib/types';

import { EditWalletSetDialog } from './components/EditWalletSetDialog';
import { NewWalletDialog } from './components/NewWalletDialog';

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    throw new Error('Wallet Set ID is required');
  }

  const [walletsResp, walletSetResp] = await Promise.all([
    sdk.listWallets({ walletSetId: id }),
    sdk.getWalletSet({ id }),
  ]);

  return {
    wallets: walletsResp?.data?.wallets as ElementsWallet[],
    walletSet: walletSetResp?.data?.walletSet as ElementsWalletSet,
  };
}

function Header({ walletSet }: { walletSet: ElementsWalletSet }) {
  const revalidator = useRevalidator();

  const revalidate = () => {
    revalidator.revalidate();
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-background px-8 py-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-foreground">
            {walletSet.name ?? 'No Name'}
          </h1>
          <EditWalletSetDialog walletSet={walletSet} onSuccess={revalidate} />
        </div>

        <NewWalletDialog walletSetId={walletSet.id} onSuccess={revalidate} />
      </header>

      <div className="flex justify-between items-center px-8 pt-8">
        <Badge
          variant="secondary"
          className="font-normal text-blue-600 dark:text-blue-500"
        >
          Created: {formatDate(walletSet.createDate)}
        </Badge>

        <Badge
          variant="secondary"
          className="font-normal text-blue-600 dark:text-blue-500"
        >
          Updated: {formatDate(walletSet.updateDate)}
        </Badge>
      </div>
    </div>
  );
}

export default function Page() {
  const { id } = useParams();
  const { wallets, walletSet } = useLoaderData<typeof loader>();
  const { toast } = useToast();

  if (!id) {
    return null;
  }

  if (!wallets?.length) {
    return (
      <div>
        <Header walletSet={walletSet} />

        <div className="p-8">
          <h2>No wallets found</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header walletSet={walletSet} />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="p-4">
              <WalletDetails
                wallet={wallet}
                onAddressCopy={(address: string) => {
                  toast({
                    description: `Address ${address} copied to clipboard.`,
                  });
                }}
              >
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/wallet/${wallet.id}`}>
                    Wallet Details <ArrowUpRight />
                  </Link>
                </Button>
              </WalletDetails>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
