import { ActionFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletDetails } from '~/components/WalletDetails';
import { sdk } from '~/lib/sdk';
import { TypeBlockchain, Wallet, WalletSet } from '~/lib/types';
import { isValidString } from '~/lib/utils';

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
    wallets: walletsResp?.data?.wallets as Wallet[],
    walletSet: walletSetResp?.data?.walletSet as WalletSet,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const walletSetId = formData.get('walletSetId');
  const blockchain = formData.get('blockchain');

  if (!isValidString(name)) {
    throw new Error('Invalid name');
  }
  if (!isValidString(walletSetId)) {
    throw new Error('Invalid walletSetId');
  }
  if (!isValidString(blockchain)) {
    throw new Error('Invalid blockchain');
  }

  await sdk.createWallets({
    walletSetId,
    count: 1, // @todo: allow user to specify count
    blockchains: [blockchain as TypeBlockchain],
    metadata: [
      {
        name,
      },
    ],
  });

  return null;
}

function Header({ walletSet }: { walletSet: WalletSet }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-foreground">Wallet Set</h1>
          <EditWalletSetDialog walletSet={walletSet} />
        </div>
        <p>Name: {walletSet.name}</p>
        <p>ID: {walletSet.id}</p>
      </div>
      <NewWalletDialog walletSetId={walletSet.id} />
    </header>
  );
}

export default function Page() {
  const { id } = useParams();
  const { wallets, walletSet } = useLoaderData<typeof loader>();

  if (!id) {
    return null;
  }

  if (!wallets?.length) {
    return (
      <div className="space-y-6">
        <Header walletSet={walletSet} />

        <h2>No wallets found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header walletSet={walletSet} />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="p-4">
            <WalletDetails wallet={wallet}>
              <Button variant="outline" asChild>
                <Link to={`/wallet/${wallet.id}`}>Wallet Details</Link>
              </Button>
            </WalletDetails>
          </Card>
        ))}
      </div>
    </div>
  );
}
