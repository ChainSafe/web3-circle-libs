import { ActionFunctionArgs } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';

import { sdk } from '~/lib/sdk';

import { NewWalletDialog } from './components/NewWalletDialog';
import { WalletsCard } from './components/WalletsCard';

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  const wallets = await sdk.wallet.list({ walletSetId: id });

  const walletsWithBalance = Promise.all(
    wallets.map(async (wallet) => {
      return {
        ...wallet,
        balance: await sdk.wallet.balance({
          id: wallet.id,
          includeAll: true,
        }),
      };
    }),
  );

  return walletsWithBalance;
}

enum BLOCKCHAIN {
  ETH = 'ETH',
  ETH_SEPOLIA = 'ETH-SEPOLIA',
  AVAX = 'AVAX',
  AVAX_FUJI = 'AVAX-FUJI',
  MATIC = 'MATIC',
  MATIC_AMOY = 'MATIC-AMOY',
  SOL = 'SOL',
  SOL_DEVNET = 'SOL-DEVNET',
  ARB = 'ARB',
  ARB_SEPOLIA = 'ARB-SEPOLIA',
  NEAR = 'NEAR',
  NEAR_TESTNET = 'NEAR-TESTNET',
  EVM = 'EVM',
  EVM_TESTNET = 'EVM-TESTNET',
  UNI_SEPOLIA = 'UNI-SEPOLIA',
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = String(body.get('name'));
  const walletSetId = String(body.get('walletSetId'));

  await sdk.wallet.create({
    walletSetId,
    blockchains: [BLOCKCHAIN.ETH_SEPOLIA],
    metadata: [
      {
        name,
      },
    ],
  });

  return null;
}

export default function Page() {
  const { id } = useParams();
  const wallets = useLoaderData<typeof loader>();

  if (!id) {
    return null;
  }

  if (!wallets.length) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Wallet Set {id}</h1>
          </div>
        </header>

        <h2>No wallets found</h2>
        <NewWalletDialog walletSetId={id} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Wallet Set {id}</h1>
        </div>
      </header>

      <WalletsCard wallets={wallets} walletSetId={id} />
    </div>
  );
}
