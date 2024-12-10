export enum BLOCKCHAIN {
  ARB = 'ARB',
  ARB_SEPOLIA = 'ARB-SEPOLIA',
  AVAX = 'AVAX',
  AVAX_FUJI = 'AVAX-FUJI',
  ETH = 'ETH',
  ETH_SEPOLIA = 'ETH-SEPOLIA',
  EVM = 'EVM',
  EVM_TESTNET = 'EVM-TESTNET',
  MATIC = 'MATIC',
  MATIC_AMOY = 'MATIC-AMOY',
  NEAR = 'NEAR',
  NEAR_TESTNET = 'NEAR-TESTNET',
  SOL = 'SOL',
  SOL_DEVNET = 'SOL-DEVNET',
}

export const BASE_URL = 'https://api.circle.com/v1';

export enum FEE_LEVEL {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum TRANSACTION_STATE {
  INITIATED = 'INITIATED', // The transaction has been initiated.
  QUEUED = 'QUEUED', // The transaction is in the processing queue.
  PENDING_RISK_SCREENING = 'PENDING_RISK_SCREENING', // The transaction is waiting for risk screening.
  SENT = 'SENT', // The transaction has been identified in the Mempool and assigned a transaction hash. The transaction may be accelerated at this stage.
  CONFIRMED = 'CONFIRMED', // The transaction has been identified on a mined block. The transaction can no longer be canceled.
  COMPLETE = 'COMPLETE', // Terminal State. The transaction has successfully completed.
  CANCELED = 'CANCELED', // Terminal State. The transaction has been canceled and must be re-initiated.
  FAILED = 'FAILED', // Terminal State. The transaction has failed. The transaction must be re-initiated.
  DENIED = 'DENIED', // Terminal State. The platform denies the transaction. For a detailed reason, refer to the errorReason.
  ACCELERATED = 'ACCELERATED', // The transaction has been accelerated.
}

export enum TRANSFER_STATE {
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  COMPLETE = 'COMPLETE',
  DENIED = 'DENIED',
  FAILED = 'FAILED',
  INITIATED = 'INITIATED',
  PENDING_RISK_SCREENING = 'PENDING_RISK_SCREENING',
  QUEUED = 'QUEUED',
  SENT = 'SENT',
}

export enum WALLET_STATE {
  LIVE = 'LIVE',
  FROZEN = 'FROZEN',
}

export const TEMPLATE = {
  AIRDROP: '13e322f2-18dc-4f57-8eed-4bddfc50f85e',
  MULTI_TOKEN: 'aea21da6-0aa2-4971-9a1a-5098842b1248',
  ERC_721: '76b83278-50e2-4006-8b63-5b1a2a814533',
  ERC_20: 'a1b74add-23e0-4712-88d1-6b3009e85a86',
};

export enum MONITORED_TOKENS_SCOPE {
  SELECTED = 'SELECTED',
  MONITOR_ALL = 'MONITOR_ALL',
}
