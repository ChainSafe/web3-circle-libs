import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useLoaderData, useParams } from '@remix-run/react';

import { TransactionTableHead } from '~/components/TransactionTableHead';
import { TransactionTableRow } from '~/components/TransactionTableRow';
import { Card } from '~/components/ui/card';
import { WalletBalance } from '~/components/WalletBalance';
import { WalletDetails } from '~/components/WalletDetails';
import { FeeLevel } from '~/lib/constants';
import { sdk } from '~/lib/sdk';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';
import { isValidString } from '~/lib/utils';

import { FaucetButton } from './components/FaucetButton';
import { WalletReceiveDialog } from './components/WalletReceiveDialog';
import { WalletSendDialog } from './components/WalletSendDialog';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error('Wallet ID is required');
  }

  const [balancesRes, walletRes, transactionsRes] = await Promise.all([
    sdk.getWalletTokenBalance({
      id,
      includeAll: true,
    }),
    sdk.getWallet({ id }),
    sdk.listTransactions({ walletIds: [id] }),
  ]);

  return {
    balances: (balancesRes?.data?.tokenBalances ?? []) as WalletTokenBalance[],
    wallet: walletRes?.data?.wallet as Wallet,
    transactions: (transactionsRes?.data?.transactions ?? []) as Transaction[],
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const recipientAddress = formData.get('recipientAddress');
  const tokenId = formData.get('tokenId');
  const walletId = formData.get('walletId');
  const amount = formData.get('amount');
  const note = formData.get('note');

  if (!isValidString(recipientAddress)) {
    throw new Error('Invalid recipient address');
  }
  if (!isValidString(amount) || !(Number(amount) > 0)) {
    throw new Error('Invalid amount');
  }
  if (!isValidString(tokenId)) {
    throw new Error('Invalid token');
  }
  if (!isValidString(walletId)) {
    throw new Error('Invalid wallet');
  }
  const res = await sdk.createTransaction({
    fee: {
      type: 'level',
      config: {
        feeLevel: FeeLevel.Medium,
      },
    },
    destinationAddress: recipientAddress,
    tokenId,
    refId: note ? String(note) : undefined,
    walletId,
    amount: [amount],
  });

  return { transactionData: res.data as Transaction };
}

export default function WalletBalancePage() {
  const { id } = useParams();
  const actionData = useActionData<{ transactionData: Transaction }>();
  const { balances, wallet, transactions } = useLoaderData<typeof loader>();

  if (!id) {
    return null;
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>
          <p>ID: {id}</p>
        </div>
        <FaucetButton wallet={wallet} />
      </header>

      <Card className="p-4">
        <WalletDetails wallet={wallet}>
          <div className="flex space-x-3">
            <WalletReceiveDialog wallet={wallet} />
            <WalletSendDialog
              wallet={wallet}
              balances={balances}
              transactionData={actionData?.transactionData}
            />
          </div>
        </WalletDetails>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Balances</h2>

        <div className="space-y-4">
          {balances.length === 0 && <p>Wallet is empty</p>}

          {balances.map((balance) => (
            <div key={balance.token.id}>
              <WalletBalance balance={balance} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transactions</h2>

        <div className="space-y-4">
          {transactions.length === 0 && <p>No transactions</p>}

          {transactions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <TransactionTableHead />

                <tbody>
                  {transactions.map((tx) => (
                    <TransactionTableRow key={tx.id} transaction={tx} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
