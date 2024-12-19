/**
 * Request types
 */
import {
  FeeLevel,
  TransactionState,
  WalletState,
} from '@circle-fin/developer-controlled-wallets';

import { Blockchain, TestnetBlockchain, TransactionType } from '~/lib/constants';

export type TypeBlockchain = (typeof Blockchain)[keyof typeof Blockchain];
export type TypeTestnetBlockchain =
  (typeof TestnetBlockchain)[keyof typeof TestnetBlockchain];
export type TypeTransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export enum TransferState {
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

/**
 * A developer controlled wallet set
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-set
 */
export interface WalletSet {
  /** System-generated unique identifier of the resource. */
  id: string;
  /** Date and time the resource was created, in ISO-8601 UTC format. */
  createDate: string;
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
  custodyType: string;
  /** Name or description associated with the wallet or walletSet. */
  name?: string;
}

/**
 * The token balance
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
 */
export interface WalletTokenBalance {
  /** The token balance amount */
  amount: string;
  token: {
    /** System-generated unique identifier of the resource. */
    id: string;
    /** Blockchain name of the specified token. */
    name: string;
    standard?: string;
    /** The blockchain network that the resource is to be created on or is currently on. */
    blockchain: TypeBlockchain;
    /** Number of decimal places shown in the token amount. */
    decimals: number;
    /** Defines if the token is a native token of the specified blockchain. If TRUE, the token is a native token. */
    isNative: boolean;
    /** Blockchain symbol of the specified token. */
    symbol: string;
    /**
     * Blockchain generated unique identifier, associated with wallet (account),
     * smart contract or other blockchain objects.
     */
    tokenAddress?: string;
    /** Date and time the resource was last updated, in ISO-8601 UTC format. */
    updateDate: string;
    /** Date and time the resource was created, in ISO-8601 UTC format. */
    createDate: string;
  };
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
}

/**
 * NFTs for a wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts
 */
export interface WalletNft {
  /**
   * Amount of NFTs on a wallet. For non-fungible token standards, like ERC721, NonFungible, NonFungibleEdition,
   * ProgrammableNonFungible, ProgrammableNonFungibleEdition, amount will always be “1”;
   * for semi-fungible token standards like ERC1155, amount will correspond to the number of tokens;
   * for FungibleAsset, amount can be greater than "1".
   */
  amount: string;
  /** The metadata of the NFT. */
  metadata: string;
  /** The NFT token ID. */
  nftTokenId: string;
  token: {
    /** System-generated unique identifier of the resource. */
    id: string;
    /** Blockchain name of the specified token. */
    name: string;
    standard: string;
    /** The blockchain network that the resource is to be created on or is currently on. */
    blockchain: TypeBlockchain;
    /** Number of decimal places shown in the token amount. */
    decimals: number;
    /** Defines if the token is a native token of the specified blockchain. If TRUE, the token is a native token. */
    isNative: boolean;
    /** Blockchain symbol of the specified token. */
    symbol: string;
    /**
     * Blockchain generated unique identifier, associated with wallet (account),
     * smart contract or other blockchain objects.
     */
    tokenAddress: string;
    /** Date and time the resource was last updated, in ISO-8601 UTC format. */
    updateDate: string;
    /** Date and time the resource was created, in ISO-8601 UTC format. */
    createDate: string;
  };
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
}

/**
 * A wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet
 */
export interface Wallet {
  /** System-generated unique identifier of the resource. */
  id: string;
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  address: string;
  /**
   * The blockchain network that the resource is to be created on or is currently on.
   */
  blockchain: TypeBlockchain;
  /**
   * Date and time the resource was created, in ISO-8601 UTC format.
   */
  createDate: string; // You can also use Date if you prefer to parse it
  /**
   * Date and time the resource was last updated, in ISO-8601 UTC format.
   */
  updateDate: string; // Same here
  /**
   * Describes who controls the digital assets in a wallet: either the end-user or the developer.
   */
  custodyType: string; // Use specific value if it’s always this, or allow other potential types
  /**
   * Name or description associated with the wallet or walletSet.
   */
  name: string;
  /**
   * Reference or description used to identify the object.
   */
  refId: string;
  /**
   * This enum describes the current state of the wallet.
   */
  state: WalletState; // If the state can only have specific values, you can use string literals like 'LIVE' | 'INACTIVE'
  /**
   * Unique system generated identifier for the user.
   */
  userId?: string;
  /**
   * System-generated unique identifier of the resource.
   */
  walletSetId: string;
  /**
   * For NEAR blockchains only, the originally assigned public key of a wallet at the time of its creation.
   */
  initialPublicKey?: string;
  /**
   * An account can be a Smart Contract Account (SCA) or an Externally Owned Account (EOA).
   * To learn more, see the account types guide (https://developers.circle.com/w3s/programmable-wallets-account-types).
   * If an account type is not specified during the creation of a wallet,
   * it defaults to EOA (Externally Owned Account).
   * Note that Solana doesn't support Smart Contract Account (SCA).
   */
  accountType: string; // Use string literal if there are multiple fixed types
}

/**
 * A signed transaction
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-transaction
 */
export interface SignedTransaction {
  /** The signature of the signed transaction. */
  signature: string;
  /**
   * Signed transaction.
   * Base64 encoded for NEAR and Solana chains. Hex encoded for EVM chains.
   */
  signedTransaction: string;
  /**
   * Blockchain-generated identifier of the transaction.
   * Present if the wallet blockchain is not Solana.
   */
  txHash: string;
}

/**
 * A signed delegate action
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-delegate-action
 */
export type SignedTransactionDelegate = SignedTransaction & {
  /** Signed delegate action is a base64 encoded string for NEAR. */
  signedDelegateAction?: string;
};

/**
 * A transaction
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-transaction
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-transactions
 */
export interface Transaction {
  /** System-generated unique identifier of the resource. */
  id: string;
  /**
   * The contract ABI function signature or callData field is required for interacting with the smart contract.
   * The ABI function signature cannot be used simultaneously with callData.
   */
  abiFunctionSignature?: string;
  /**
   * The contract ABI function signature parameters for executing the contract interaction.
   * Supported parameter types include string, integer, boolean, and array.
   * These parameters should be used exclusively with the abiFunctionSignature and cannot be used with callData.
   */
  abiParameters?: (string | number)[] | null;
  /**
   * Transfer amounts in decimal number format, at least one element is required for transfer.
   * For ERC721 token transfer, the amounts field is required to be ["1"] (array with "1" as the only element).
   */
  amounts?: string[];
  /** Transaction amount in USD decimal format. */
  amountInUSD?: string;
  /** Identifier for the block that includes the transaction. */
  blockHash?: string;
  /** Block height of the transaction, representing the number of blockchain confirmations. */
  blockHeight?: number;
  /** The blockchain network that the resource is to be created on or is currently on. */
  blockchain: TypeBlockchain;
  /** The blockchain address of the contract to be executed. */
  contractAddress?: string;
  /** Date and time the resource was created, in ISO-8601 UTC format. */
  createDate: string;
  /** Describes who controls the digital assets in a wallet: either the end-user or the developer. */
  custodyType: 'DEVELOPER' | 'ENDUSER';
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  destinationAddress: string;
  /** Description of the error. Only present for transactions in FAILED state. */
  errorReason?: string;
  /** Additional detail associated with the corresponding transaction's error reason */
  errorDetails?: string;
  /**
   * The estimated fee for the transaction.
   * For Get Transactions API, this will only be returned if transaction type is used in
   * the request query parameters
   */
  estimatedFee?: {
    /**
     * The maximum units of gas to use for the transaction.
     * Using gasLimit together with feeLevel, the provided gasLimit is required to be
     * greater or equal to feeLevel estimation and will override the estimation's gasLimit.
     */
    gasLimit?: string;
    /**
     * For blockchains without EIP-1559 support,
     * the maximum price of gas, in gwei, to use per each unit of gas (see gasLimit).
     * Requires gasLimit. Cannot be used with feeLevel, priorityFee, or maxFee.
     */
    gasPrice?: string;
    /**
     * For blockchains with EIP-1559 support,
     * the maximum price per unit of gas (see gasLimit), in gwei.
     * Requires priorityFee, and gasLimit to be present.
     * Cannot be used with feeLevel or gasPrice.
     */
    maxFee?: string;
    /**
     * For blockchains with EIP-1559 support,
     * the “tip”, in gwei, to add to the base fee as an incentive for validators.
     * Please note that the maxFee and gasLimit parameters are required alongside the priorityFee.
     * The feeLevel and gasPrice parameters cannot be used with the priorityFee.
     */
    priorityFee?: string;
    /**
     * For blockchains with EIP-1559 support,
     * the estimated base fee represents the minimum fee required for a transaction to be included
     * in a block on the blockchain.
     * It is measured in gwei and compensates for the computational resources validators consume to
     * process the transaction. The base fee is supplemented by a separate "tip" called the priority fee,
     * which acts as an extra incentive for validators to prioritize the transaction.
     * The priority fee is added to the base fee to calculate the final transaction fee.
     */
    baseFee?: string;
    /**
     * The estimated network fee is the maximum amount of cryptocurrency (such as ETH, ARB, or SOL)
     * that you will pay for your transaction. This fee depends on the parameters you set, including Gas Limit,
     * Priority Fee, and Max Fee. It compensates for the computational resources that validators consume to
     * process the transaction. It is measured in native token such as ETH, SOL.
     * Each blockchain might use different formula for network fee.
     * Refer to each specific blockchain's documentation to understand how networkFee is calculated.
     */
    networkFee?: string;
  };
  /**
   * Defines the blockchain fee level which will be paid for the transaction
   * e.g. LOW, MEDIUM, HIGH. For Get Transactions API,
   * this will only be returned if transaction type is used in the request query parameters
   */
  feeLevel?: FeeLevel;
  /** Date the transaction was first confirmed in a block. ISO-8601 UTC date/time. */
  firstConfirmDate?: string;
  /** Gas fee, in native token, paid to the network for the transaction. */
  networkFee?: string;
  /** Gas fee, in USD, paid to the network for the transaction. */
  networkFeeInUSD?: string;
  /** List of Nfts, in JSON string format, associated with the transaction. */
  nfts?: string[] | null; // TODO: SDK or API returns null when no NFTs so the type is incorrect

  /** Operation type of the transaction. */
  operation: 'TRANSFER' | 'CONTRACT_EXECUTION' | 'CONTRACT_DEPLOYMENT';
  /** Optional reference or description used to identify the transaction. */
  refId?: string;
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  sourceAddress: string;
  /** Current state of the transaction. */
  state: TransactionState;
  /** System-generated unique identifier of the resource. */
  tokenId?: string;
  transactionType: TypeTransactionType;
  /** Blockchain generated identifier of the transaction. */
  txHash?: string;
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
  /** Unique system generated identifier for the user. */
  userId?: string;
  /** System-generated unique identifier of the resource. */
  walletId: string;
  transactionScreeningEvaluation?: {
    /** Name of the matched rule found in screening. */
    ruleName?: string;
    /** Actions to take for the decision. */
    actions?: string[];
    /** Date and time the resource was created, in ISO-8601 UTC format. */
    screeningDate?: string;
    /**
     * Risk signals found include source, value, and type of the signal.
     * It also contains risk score and risk category.
     */
    reasons?: {
      /** Source of the risk signal. */
      source: string;
      /**
       * Value of the source. For example, if source is “ADDRESS”.
       * The source value would be an blockchain address.
       */
      sourceValue: string;
      /** Risk score of the signal. */
      riskScore: string;
      /** List of risk categories for the signal. */
      riskCategories: string[];
      /** Type of the signal. */
      type: string;
    }[];
  };
}

/**
 * A transfer transaction
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-transfer
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-contract-execution
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-cancel
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-accelerate
 */
export interface Transfer {
  /** System-generated unique identifier of the resource. */
  id: string;
  /** Current state of the transaction. */
  state?: TransferState;
}

/**
 * An estimate of a fee
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-deploy
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-template-deploy
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transaction-estimate-fee
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transfer-estimate-fee
 */
export interface EstimateFee {
  high: {
    /**
     * The maximum units of gas to use for the transaction.
     * Using gasLimit together with feeLevel, the provided gasLimit is required to be
     * greater or equal to feeLevel estimation and will override the estimation's gasLimit.
     */
    gasLimit: string;
    /**
     * For blockchains without EIP-1559 support,
     * the maximum price of gas, in gwei, to use per each unit of gas (see gasLimit).
     * Requires gasLimit. Cannot be used with feeLevel, priorityFee, or maxFee.
     */
    gasPrice?: string;
    /**
     * For blockchains with EIP-1559 support,
     * the maximum price per unit of gas (see gasLimit), in gwei.
     * Requires priorityFee, and gasLimit to be present.
     * Cannot be used with feeLevel or gasPrice.
     */
    maxFee: string;
    /**
     * For blockchains with EIP-1559 support,
     * the “tip”, in gwei, to add to the base fee as an incentive for validators.
     * Please note that the maxFee and gasLimit parameters are required alongside the priorityFee.
     * The feeLevel and gasPrice parameters cannot be used with the priorityFee.
     */
    priorityFee: string;
    /**
     * For blockchains with EIP-1559 support,
     * the estimated base fee represents the minimum fee required for a transaction to be included
     * in a block on the blockchain.
     * It is measured in gwei and compensates for the computational resources validators consume to
     * process the transaction. The base fee is supplemented by a separate "tip" called the priority fee,
     * which acts as an extra incentive for validators to prioritize the transaction.
     * The priority fee is added to the base fee to calculate the final transaction fee.
     */
    baseFee: string;
    /**
     * The estimated network fee is the maximum amount of cryptocurrency (such as ETH, ARB, or SOL)
     * that you will pay for your transaction. This fee depends on the parameters you set, including Gas Limit,
     * Priority Fee, and Max Fee. It compensates for the computational resources that validators consume to
     * process the transaction. It is measured in native token such as ETH, SOL.
     * Each blockchain might use different formula for network fee.
     * Refer to each specific blockchain's documentation to understand how networkFee is calculated.
     */
    networkFee: string;
  };
  low: {
    /**
     * The maximum units of gas to use for the transaction.
     * Using gasLimit together with feeLevel, the provided gasLimit is required to be
     * greater or equal to feeLevel estimation and will override the estimation's gasLimit.
     */
    gasLimit: string;
    /**
     * For blockchains without EIP-1559 support,
     * the maximum price of gas, in gwei, to use per each unit of gas (see gasLimit).
     * Requires gasLimit. Cannot be used with feeLevel, priorityFee, or maxFee.
     */
    gasPrice?: string;
    /**
     * For blockchains with EIP-1559 support,
     * the maximum price per unit of gas (see gasLimit), in gwei.
     * Requires priorityFee, and gasLimit to be present.
     * Cannot be used with feeLevel or gasPrice.
     */
    maxFee: string;
    /**
     * For blockchains with EIP-1559 support,
     * the “tip”, in gwei, to add to the base fee as an incentive for validators.
     * Please note that the maxFee and gasLimit parameters are required alongside the priorityFee.
     * The feeLevel and gasPrice parameters cannot be used with the priorityFee.
     */
    priorityFee: string;
    /**
     * For blockchains with EIP-1559 support,
     * the estimated base fee represents the minimum fee required for a transaction to be included
     * in a block on the blockchain.
     * It is measured in gwei and compensates for the computational resources validators consume to
     * process the transaction. The base fee is supplemented by a separate "tip" called the priority fee,
     * which acts as an extra incentive for validators to prioritize the transaction.
     * The priority fee is added to the base fee to calculate the final transaction fee.
     */
    baseFee: string;
    /**
     * The estimated network fee is the maximum amount of cryptocurrency (such as ETH, ARB, or SOL)
     * that you will pay for your transaction. This fee depends on the parameters you set, including Gas Limit,
     * Priority Fee, and Max Fee. It compensates for the computational resources that validators consume to
     * process the transaction. It is measured in native token such as ETH, SOL.
     * Each blockchain might use different formula for network fee.
     * Refer to each specific blockchain's documentation to understand how networkFee is calculated.
     */
    networkFee: string;
  };
  medium: {
    /**
     * The maximum units of gas to use for the transaction.
     * Using gasLimit together with feeLevel, the provided gasLimit is required to be
     * greater or equal to feeLevel estimation and will override the estimation's gasLimit.
     */
    gasLimit: string;
    /**
     * For blockchains without EIP-1559 support,
     * the maximum price of gas, in gwei, to use per each unit of gas (see gasLimit).
     * Requires gasLimit. Cannot be used with feeLevel, priorityFee, or maxFee.
     */
    gasPrice?: string;
    /**
     * For blockchains with EIP-1559 support,
     * the maximum price per unit of gas (see gasLimit), in gwei.
     * Requires priorityFee, and gasLimit to be present.
     * Cannot be used with feeLevel or gasPrice.
     */
    maxFee: string;
    /**
     * For blockchains with EIP-1559 support,
     * the “tip”, in gwei, to add to the base fee as an incentive for validators.
     * Please note that the maxFee and gasLimit parameters are required alongside the priorityFee.
     * The feeLevel and gasPrice parameters cannot be used with the priorityFee.
     */
    priorityFee: string;
    /**
     * For blockchains with EIP-1559 support,
     * the estimated base fee represents the minimum fee required for a transaction to be included
     * in a block on the blockchain.
     * It is measured in gwei and compensates for the computational resources validators consume to
     * process the transaction. The base fee is supplemented by a separate "tip" called the priority fee,
     * which acts as an extra incentive for validators to prioritize the transaction.
     * The priority fee is added to the base fee to calculate the final transaction fee.
     */
    baseFee: string;
    /**
     * The estimated network fee is the maximum amount of cryptocurrency (such as ETH, ARB, or SOL)
     * that you will pay for your transaction. This fee depends on the parameters you set, including Gas Limit,
     * Priority Fee, and Max Fee. It compensates for the computational resources that validators consume to
     * process the transaction. It is measured in native token such as ETH, SOL.
     * Each blockchain might use different formula for network fee.
     * Refer to each specific blockchain's documentation to understand how networkFee is calculated.
     */
    networkFee: string;
  };
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
}

/**
 * A token
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-token-id
 */
export interface Token {
  /** System-generated unique identifier of the resource. */
  id: string;
  /** Blockchain name of the specified token. */
  name: string;
  standard: string;
  /** The blockchain network that the resource is to be created on or is currently on. */
  blockchain: TypeBlockchain;
  /** Number of decimal places shown in the token amount. */
  decimals: number;
  /**
   * Defines if the token is a native token of the specified blockchain.
   * If TRUE, the token is a native token.
   */
  isNative: boolean;
  /** Blockchain symbol of the specified token. */
  symbol: string;
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  tokenAddress: string;
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
  /** Date and time the resource was created, in ISO-8601 UTC format. */
  createDate: string;
}

/**
 * A response from a request to deploy a contract from a template
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract-template
 */
export interface DeployContractFromTemplate {
  /** Unique identifiers of the created smart contracts. */
  contractIds: string[];
  /** Unique identifier of the pending deployment transaction. transaction. */
  transactionId: string;
}

/**
 * A deployed contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract
 */
export interface DeployContract {
  /** Unique identifier of the created smart contract. */
  contractId: string;
  /** Unique identifier of the deployment transaction. */
  transactionId: string;
}

/**
 * The result of querying a contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/query-contract
 */
export interface QueryContract {
  /** Output for the ABI interaction. */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  outputValues: any[];
  /** OutputData is output in hex format. */
  outputData: string;
}

/**
 * Information about a smart contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-contracts
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/import-contract
 */
export interface Contract {
  /** System-generated unique identifier of the resource. */
  id: string;
  /** The id of the Programmable Wallet that deployed this contract. */
  deployerWalletID: string;
  /** The id of the deployment transaction for this contract. */
  deploymentTransactionId: string;
  /** Blockchain generated identifier of the transaction. */
  txHash: string;
  /** The contract's ABI in a JSON stringified format. */
  abiJson: string;
  /**
   * The archive state of the contract.
   * If true, the contract will not be visible in your dashboard.
   */
  archived: boolean;
  /**
   * The blockchain network that the resource is to be created on or is currently on.
   * Required along with sourceAddress if you don't provide walletId.
   * The blockchain and walletId fields are mutually exclusive.
   */
  blockchain: TypeBlockchain;
  /** Bytecode of the contract being deployed. */
  bytecode: string;
  /** The on-chain address of this contract. */
  contractAddress: string;
  /** The input type for the contract. */
  contractInputType: string;
  /** The address that created this contract, if deployed. */
  deployerAddress: string;
  deployerUserID?: string;
  deploymentErrorReason?: string;
  deploymentErrorDetails?: string;
  /** The name for a contract. Must be alphanumeric [a-zA-Z0-9]. */
  name: string;
  /** The description for a contract. */
  description: string;
  /** The status of the contract. */
  status: string;
  /** The verification status of the contract. */
  verificationStatus: string;
  /** The ipfs metadata link of the contract. */
  metadataLink: string;
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
  /** Date and time the resource was created, in ISO-8601 UTC format. */
  createDate: string;
  /** Contract source code */
  sourceCode?: {
    /** Name of the file. */
    fileName: string;
    /**
     * Content of the file.
     * If the contract's source code was flattened before verification,
     * this may be the entire source code.
     */
    fileContent: string;
  }[];
  /** Functions supported by this contract. Parsed from abi_json. */
  functions?: {
    name: string;
    stateMutability: string;
    type: string;
    inputs: {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
    outputs?: {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
  }[];
  /** Events this contract can emit. Parsed from abi_json. */
  events?: {
    name: string;
    type: string;
    anonymous: boolean;
    inputs: {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
  }[];
  /** Object of the implementation contract. */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  implementationContract?: any;
}

/**
 * An event monitor
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-event-monitors
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/create-event-monitor
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-event-monitor
 */
export interface EventMonitor {
  id: string;
  blockchain: TypeBlockchain;
  /** The on-chain address of this contract. */
  contractAddress: string;
  eventSignature: string;
  eventSignatureHash: string;
  isEnabled: boolean;
  createDate: string;
  updateDate: string;
}

/**
 * An event log
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-event-logs
 */
export interface EventLog {
  blockHash: string;
  blockHeight: number;
  blockchain: TypeBlockchain;
  /** The on-chain address of this contract. */
  contractAddress: string;
  data: string;
  eventSignature: string;
  eventSignatureHash: string;
  firstConfirmDate: string;
  id: string;
  logIndex: string;
  topics: string[];
  txHash: string;
  userOpHash: string;
}
