import { UpdateWalletSetInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunction } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

export const action: ActionFunction = async ({ request }) => {
  const res = await sdk.updateWalletSet((await request.json()) as UpdateWalletSetInput);
  return Response.json(res.data);
};
