import { GetTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

/**
 * @deprecated Use `loader` instead
 */
export async function action({ request }: ActionFunctionArgs) {
  const res = await sdk.getTransaction((await request.json()) as GetTransactionInput);
  return Response.json(res.data);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await sdk.getTransaction((await request.json()) as GetTransactionInput);
  return Response.json(res.data);
}
