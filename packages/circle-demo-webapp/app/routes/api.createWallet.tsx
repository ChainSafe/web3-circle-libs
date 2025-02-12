import { AccountType, Blockchain } from '@circle-fin/developer-controlled-wallets';
import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import { assertCircleErrorResponse, errorResponse } from '~/lib/server.responses';
import { isValidString } from '~/lib/utils';

const CHAIN_TO_ACCOUNT_TYPE: Record<Blockchain, AccountType> = {
  ARB: 'SCA',
  AVAX: 'EOA',
  ETH: 'SCA',
  EVM: 'SCA',
  MATIC: 'SCA',
  NEAR: 'EOA',
  SOL: 'EOA',
  UNI: 'EOA',
  'ARB-SEPOLIA': 'SCA',
  'AVAX-FUJI': 'EOA',
  'ETH-SEPOLIA': 'SCA',
  'EVM-TESTNET': 'SCA',
  'MATIC-AMOY': 'SCA',
  'NEAR-TESTNET': 'EOA',
  'SOL-DEVNET': 'EOA',
  'UNI-SEPOLIA': 'EOA',
};

interface RequestBody {
  walletSetId: string;
  name: string;
  blockchain: Blockchain;
  description?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { walletSetId, name, blockchain, description } =
    (await request.json()) as RequestBody;

  if (!isValidString(walletSetId)) {
    return errorResponse('Invalid walletSetId');
  }

  if (!isValidString(name)) {
    return errorResponse('Invalid name');
  }

  if (description && !isValidString(description)) {
    throw new Error('Invalid description');
  }

  try {
    const res = await sdk.createWallets({
      walletSetId,
      count: 1,
      accountType: CHAIN_TO_ACCOUNT_TYPE[blockchain],
      blockchains: [blockchain],
      metadata: [
        {
          name,
          ...(description ? { refId: description } : {}),
        },
      ],
    });

    return Response.json(res.data?.wallets[0]);
  } catch (e: unknown) {
    assertCircleErrorResponse(e);

    return errorResponse(
      `${e.response.data.message}: ${e.response.data.errors[0].message}`,
    );
  }
}
