import { ListTransactionsInput } from '@circle-fin/developer-controlled-wallets';
import {
  TransactionDetails,
  TransactionTableHead,
  TransactionTableRow,
} from '@circle-libs/react-elements';
import { useParams } from '@remix-run/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Card } from '~/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog';
import { InputWithIcon } from '~/components/ui/inputWithIcon';
import { useGetTransaction } from '~/hooks/useGetTransaction';
import { useTransactions } from '~/hooks/useTransactions';

let timeout: NodeJS.Timeout;

export default function Page() {
  const { walletId } = useParams();
  const [address, setAddress] = useState<string>('');
  const [txId, setTxId] = useState<string | undefined>('');

  const getTransactionFilter = useMemo(() => ({ id: txId ?? '' }), [txId]);

  const {
    reFetch: getTransaction,
    data: transaction,
    isLoading,
  } = useGetTransaction(getTransactionFilter);

  const getTransactionsFilter = useMemo(() => {
    const filter: ListTransactionsInput = {};
    if (walletId) {
      filter.walletIds = [walletId];
    }
    if (address) {
      filter.destinationAddress = address;
    }
    return filter;
  }, [walletId, address]);

  const { data: transactions = [], reFetch: reFetchTransactions } =
    useTransactions(getTransactionsFilter);

  useEffect(() => {
    if (txId) {
      getTransaction().catch(console.error);
    }
  }, [txId, getTransaction]);

  useEffect(() => {
    reFetchTransactions().catch(console.error);
  }, [reFetchTransactions]);

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
                        withActions
                        onClickDetails={(data) => {
                          setTxId(data?.id);
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
        {(isLoading || (txId && transaction)) && (
          <Dialog open onOpenChange={() => setTxId(undefined)}>
            <DialogContent className="min-w-[480px]">
              <DialogTitle>Transaction Details</DialogTitle>
              {isLoading ? (
                <div className="flex justify-center items-center w-full h-40">
                  <LoaderCircle className="animate-spin" />
                </div>
              ) : transaction ? (
                <TransactionDetails transaction={transaction} />
              ) : null}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
