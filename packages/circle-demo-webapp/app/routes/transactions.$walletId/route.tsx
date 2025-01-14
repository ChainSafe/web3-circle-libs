import { useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { Card } from '~/components/ui/card';
import { InputWithIcon } from '~/components/ui/inputWithIcon';
import { useTransactions } from '~/hooks/useTransactions';
import { TransactionWithToken } from '~/lib/types';

import { TransactionDetails } from './components/TransactionDetails';
import { TransactionTableHead } from './components/TransactionTableHead';
import { TransactionTableRow } from './components/TransactionTableRow';

let timeout: NodeJS.Timeout;

export default function Page() {
  const { walletId } = useParams();
  const [transaction, setTransaction] = useState<TransactionWithToken>();
  const [address, setAddress] = useState<string>('');
  const { data: transactions = [], refetch: reFetchTransactions } = useTransactions(
    walletId ?? '',
    {
      filter: {
        address,
      },
    },
  );
  useEffect(() => {
    reFetchTransactions().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleChangeSearchAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addr = e?.target?.value;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setAddress(addr ?? '');
    }, 500);
  };

  if (!walletId) {
    throw new Error('Wallet ID is required');
  }

  return (
    <div>
      <header className="flex justify-between items-center bg-background px-8 py-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-foreground">Transactions</h1>
        </div>
      </header>
      <div className="p-8">
        <Card className="p-4">
          <div className="flex justify-end align-center">
            <InputWithIcon
              type="text"
              placeholder="Search address"
              onChange={handleChangeSearchAddress}
              className="max-w-sm"
            />
          </div>
          <div className="space-y-4">
            {transactions.length === 0 && <p>No transactions</p>}

            {transactions.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <TransactionTableHead />
                  <tbody>
                    {transactions.map((tx) => (
                      <TransactionTableRow
                        key={tx.id}
                        transaction={tx}
                        onClickDetails={(tx) => setTransaction(tx)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
        {transaction && (
          <TransactionDetails
            transaction={transaction}
            onClose={() => setTransaction(undefined)}
          />
        )}
      </div>
    </div>
  );
}
