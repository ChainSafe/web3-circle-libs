export const TestnetBlockchain = {
  ArbSepolia: 'ARB-SEPOLIA',
  AvaxFuji: 'AVAX-FUJI',
  EthSepolia: 'ETH-SEPOLIA',
  MaticAmoy: 'MATIC-AMOY',
  SolDevnet: 'SOL-DEVNET',
  UniSepolia: 'UNI-SEPOLIA',
} as const;

export const Blockchain = {
  Arb: 'ARB',
  Avax: 'AVAX',
  Eth: 'ETH',
  Evm: 'EVM',
  Matic: 'MATIC',
  Near: 'NEAR',
  Sol: 'SOL',
  ArbSepolia: 'ARB-SEPOLIA',
  AvaxFuji: 'AVAX-FUJI',
  EthSepolia: 'ETH-SEPOLIA',
  EvmTestnet: 'EVM-TESTNET',
  MaticAmoy: 'MATIC-AMOY',
  NearTestnet: 'NEAR-TESTNET',
  SolDevnet: 'SOL-DEVNET',
} as const;

export const TransactionType = {
  Inbound: 'INBOUND',
  Outbound: 'OUTBOUND',
};
export const FeeLevel = {
  High: 'HIGH',
  Medium: 'MEDIUM',
  Low: 'LOW',
} as const;

export const TransactionState = {
  Cancelled: 'CANCELLED',
  Confirmed: 'CONFIRMED',
  Complete: 'COMPLETE',
  Denied: 'DENIED',
  Failed: 'FAILED',
  Initiated: 'INITIATED',
  PendingRiskScreening: 'PENDING_RISK_SCREENING',
  Queued: 'QUEUED',
  Sent: 'SENT',
};
