import { ActionFunctionArgs } from '@remix-run/node';

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
    return Response.json({ error: 'Invalid wallet id' });
  }

  if (!isValidString(name)) {
    return Response.json({ error: 'Invalid name' });
  }

  try {
    await sdk.updateWallet({
      id,
      name,
    });

    return Response.json({ message: 'Success' });
  } catch (e: unknown) {
    return Response.json({ error: (e as ErrorResponseObject)?.response?.data });
  }
}
