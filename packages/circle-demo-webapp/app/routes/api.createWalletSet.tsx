import { ActionFunctionArgs } from '@remix-run/node';

import { cachedWalletSets } from '~/lib/memcache';
import { sdk } from '~/lib/sdk';
import {
  assertCircleErrorResponse,
  errorResponse,
  successResponse,
} from '~/lib/server.responses';
import { isValidString } from '~/lib/utils';

interface RequestBody {
  name: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { name } = (await request.json()) as RequestBody;

  if (!isValidString(name)) {
    return errorResponse('Invalid name');
  }

  try {
    await sdk.createWalletSet({
      name,
    });

    cachedWalletSets.invalidate();

    return successResponse('Success');
  } catch (e: unknown) {
    assertCircleErrorResponse(e);

    return errorResponse(
      `${e.response.data.message}: ${e.response.data.errors[0].message}`,
    );
  }
}
