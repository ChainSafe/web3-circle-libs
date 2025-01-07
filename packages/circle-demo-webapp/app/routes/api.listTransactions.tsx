import { ListTransactionsInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunction } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

export const action: ActionFunction = async ({ request }) => {
  const res = await sdk.listTransactions((await request.json()) as ListTransactionsInput);
  return Response.json(res.data);
};
