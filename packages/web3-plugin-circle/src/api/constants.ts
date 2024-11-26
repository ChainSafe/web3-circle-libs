export const BLOCKCHAIN = {
  ARB: 'ARB',
  ARB_SEPOLIA: 'ARB-SEPOLIA',
  AVAX: 'AVAX',
  AVAX_FUJI: 'AVAX-FUJI',
  ETH: 'ETH',
  ETH_SEPOLIA: 'ETH-SEPOLIA',
  EVM: 'EVM',
  EVM_TESTNET: 'EVM-TESTNET',
  MATIC: 'MATIC',
  MATIC_AMOY: 'MATIC-AMOY',
  NEAR: 'NEAR',
  NEAR_TESTNET: 'NEAR-TESTNET',
  SOL: 'SOL',
  SOL_DEVNET: 'SOL-DEVNET',
};

export const FEE_LEVEL = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
};

export const TRANSACTION_STATE = {
  INITIATED: 'INITIATED', // The transaction has been initiated.
  QUEUED: 'QUEUED', // The transaction is in the processing queue.
  PENDING_RISK_SCREENING: 'PENDING_RISK_SCREENING', // The transaction is waiting for risk screening.
  SENT: 'SENT', // The transaction has been identified in the Mempool and assigned a transaction hash. The transaction may be accelerated at this stage.
  CONFIRMED: 'CONFIRMED', // The transaction has been identified on a mined block. The transaction can no longer be canceled.
  COMPLETE: 'COMPLETE', // Terminal State. The transaction has successfully completed.
  CANCELED: 'CANCELED', // Terminal State. The transaction has been canceled and must be re-initiated.
  FAILED: 'FAILED', // Terminal State. The transaction has failed. The transaction must be re-initiated.
  DENIED: 'DENIED', // Terminal State. The platform denies the transaction. For a detailed reason, refer to the errorReason.
  ACCELERATED: 'ACCELERATED', // The transaction has been accelerated.
};
