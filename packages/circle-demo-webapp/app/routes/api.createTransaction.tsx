import { CreateTransferTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunction } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

export const action: ActionFunction = async ({ request }) => {
  const res = await sdk.createTransaction(
    (await request.json()) as CreateTransferTransactionInput,
  );
  return Response.json(res.data);
};
