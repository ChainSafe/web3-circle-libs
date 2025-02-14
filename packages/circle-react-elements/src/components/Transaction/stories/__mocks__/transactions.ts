import type { Token } from '@circle-fin/developer-controlled-wallets';

import type { ElementsTransactionWithToken } from '~/lib/types';

const mockToken: Token = {
  id: 'USDC_ETH',
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  blockchain: 'ETH',
  isNative: false,
  createDate: '2024-01-30T10:00:00Z',
  updateDate: '2024-01-30T10:00:00Z',
};

const mockDate = '2024-01-30T10:00:00Z';

const mockAddress = {
  source: '0x1234567890abcdef1234567890abcdef12345678',
  destination: '0x9876543210abcdef1234567890abcdef12345678',
};

export const baseTransaction: ElementsTransactionWithToken = {
  sourceAddress: mockAddress.source,
  destinationAddress: mockAddress.destination,
  id: 'mock-tx',
  amounts: ['1000.00'],
  blockchain: 'ETH',
  createDate: mockDate,
  updateDate: mockDate,
  state: 'COMPLETE',
  transactionType: 'OUTBOUND',
  txHash: '0x1234abcd5678efgh',
};

export const transactionWithToken: ElementsTransactionWithToken = {
  ...baseTransaction,
  token: mockToken,
  tokenId: mockToken.id,
};

export const transactionWithoutToken: ElementsTransactionWithToken = {
  ...baseTransaction,
  token: undefined,
  tokenId: undefined,
};

export const transactionWithConfirmDate: ElementsTransactionWithToken = {
  ...baseTransaction,
  firstConfirmDate: new Date().toISOString(),
};

export const inboundTransaction: ElementsTransactionWithToken = {
  ...baseTransaction,
  transactionType: 'INBOUND',
};

export const createMockTransaction = (
  state: ElementsTransactionWithToken['state'],
): ElementsTransactionWithToken => ({
  ...baseTransaction,
  id: `mock-tx-${state}`,
  state,
});

export const createDateTransaction = (
  dateString: string,
): ElementsTransactionWithToken => ({
  ...baseTransaction,
  id: `mock-tx-${dateString}`,
  createDate: dateString,
  updateDate: dateString,
});

// Complex transaction for full examples
export const fullMockTransaction: ElementsTransactionWithToken = {
  id: '1234',
  sourceAddress: '0x1234567890abcdef1234567890abcdef12345678',
  destinationAddress: '0x9876543210abcdef1234567890abcdef12345678',
  transactionType: 'OUTBOUND',
  state: 'COMPLETE',
  amounts: ['1000.00'],
  createDate: '2024-01-30T10:00:00Z',
  updateDate: '2024-01-30T10:05:00Z',
  firstConfirmDate: '2024-01-30T10:05:00Z',
  blockchain: 'MATIC',
  txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  token: {
    id: 'USDC-MATIC',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    blockchain: 'MATIC',
    isNative: false,
    createDate: '2024-01-30T10:00:00Z',
    updateDate: '2024-01-30T10:00:00Z',
  },
  tokenId: 'USDC-MATIC',
};
