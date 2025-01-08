import { UpdateWalletSetInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

export async function action({ request }: ActionFunctionArgs) {
  const res = await sdk.updateWalletSet((await request.json()) as UpdateWalletSetInput);
  return Response.json(res.data);
}
