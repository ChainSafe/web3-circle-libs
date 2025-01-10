import { ActionFunction } from '@remix-run/node';

import { ErrorResponseObject } from '~/lib/types';

export const action: ActionFunction = () => {
  try {
    return Response.json({
      result: 'APPROVED',
      id: {},
      address: '0x1bf9ad0cc2ad298c69a2995aa806ee832788218c',
      chain: 'MATIC-AMOY',
      details: [
        {
          id: 'c4d1da72-111e-4d52-bdbf-2e74a2d803d5',
          vendor: 'VENDOR',
          response: {},
          createDate: '2023-01-01T12:04:05Z',
        },
      ],
      alertId: {},
    });
  } catch (e: unknown) {
    return Response.json({ error: (e as ErrorResponseObject)?.response?.data });
  }
};
