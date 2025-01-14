import { useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { Card } from '~/components/ui/card';
import { InputWithIcon } from '~/components/ui/inputWithIcon';
import { useTransactions } from '~/hooks/useTransactions';

import { TransactionTableHead } from './components/TransactionTableHead';
import { TransactionTableRow } from './components/TransactionTableRow';

let timeout;

export default function Page() {
  const { walletId } = useParams();
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
    reFetchTransactions(walletId);
  }, [address]);

  const handleChangeSearchAddress = (e) => {
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
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-foreground">Transactions</h1>
        </div>
      </header>
      <Card className="p-4">
        <div className="space-y-4 flex justify-end align-center">
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
