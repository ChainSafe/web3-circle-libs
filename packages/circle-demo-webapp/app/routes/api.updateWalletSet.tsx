import { ActionFunctionArgs } from '@remix-run/node';

import { invalidateCache } from '~/lib/cache';
import { sdk } from '~/lib/sdk';
import { ErrorResponseObject } from '~/lib/types';
import { isValidString } from '~/lib/utils';

interface RequestBody {
  id: string;
  name: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { id, name } = (await request.json()) as RequestBody;

  if (!isValidString(id)) {
    return Response.json({ error: 'Invalid wallet set id' });
  }

  if (!isValidString(name)) {
    return Response.json({ error: 'Invalid name' });
  }

  try {
    await sdk.updateWalletSet({
      id,
      name,
    });

    invalidateCache('walletSets');

    return Response.json({ message: 'Success' });
  } catch (e: unknown) {
    return Response.json({ error: (e as ErrorResponseObject)?.response?.data });
  }
}
