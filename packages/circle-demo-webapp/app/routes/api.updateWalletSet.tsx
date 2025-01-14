import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import {
  assertCircleErrorResponse,
  errorResponse,
  successResponse,
} from '~/lib/server.responses';
import { isValidString } from '~/lib/utils';

interface RequestBody {
  id: string;
  name: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { id, name } = (await request.json()) as RequestBody;

  if (!isValidString(id)) {
    return errorResponse('Invalid wallet id');
  }

  if (!isValidString(name)) {
    return errorResponse('Invalid name');
  }

  try {
    await sdk.updateWalletSet({
      id,
      name,
    });

    return successResponse('Success');
  } catch (e: unknown) {
    assertCircleErrorResponse(e);

    return errorResponse(e.response.data.message);
  }
}
