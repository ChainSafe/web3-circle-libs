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
  description?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { id, name, description } = (await request.json()) as RequestBody;

  if (!isValidString(id)) {
    return errorResponse('Invalid wallet id');
  }

  if (!isValidString(name)) {
    return errorResponse('Invalid name');
  }

  if (description && !isValidString(description)) {
    throw new Error('Invalid description');
  }

  try {
    await sdk.updateWallet({
      id,
      name,
      ...(description ? { refId: description } : {}),
    });

    return successResponse('Success');
  } catch (e: unknown) {
    assertCircleErrorResponse(e);

    return errorResponse(
      `${e.response.data.message}: ${e.response.data.errors[0].message}`,
    );
  }
}
