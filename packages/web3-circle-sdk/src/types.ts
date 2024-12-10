/**
 * Request types
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Options for pagination filters
 */
export type FilterPagesOptions = {
  /**
   *  A collection ID value used for pagination.
   *  It marks the exclusive end of a page.
   *  When provided, the collection resource will return the next n items before the id,
   *  with n being specified by pageSize.
   *  The items will be returned in the natural order of the collection.
   *  The resource will return the first page if neither pageAfter nor pageBefore are specified.
   *  SHOULD NOT be used in conjunction with pageAfter.
   */
  pageBefore?: string;
  /**
   * A collection ID value used for pagination.
   * It marks the exclusive begin of a page.
   * When provided, the collection resource will return the next n items after the id,
   * with n being specified by pageSize.
   * The items will be returned in the natural order of the collection.
   * The resource will return the first page if neither pageAfter nor pageBefore are specified.
   * SHOULD NOT be used in conjunction with pageBefore.
   */
  pageAfter?: string;
  /**
   * Limits the number of items to be returned.
   * Some collections have a strict upper bound that will disregard this value.
   * In case the specified value is higher than the allowed limit,
   * the collection limit will be used.
   * If avoided, the collection will determine the page size itself.
   */
  pageSize?: number;
};

/**
 * Filtering options
 */
export type FilterOptions = {
  /** Queries items created since the specified date-time (inclusive) in ISO 8601 format. */
  from?: string;
  /** Queries items created before the specified date-time (inclusive) in ISO 8601 format. */
  to?: string;
} & FilterPagesOptions;

export type FaucetRequestParameters = {
  blockchain: string;
  address: string;
  native?: boolean;
  usdc?: boolean;
  eurc?: boolean;
};

/**
 * Parameters for a create wallet request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet
 */
export type WalletCreateParameters = {
  /** System-generated unique identifier of the resource. */
  walletSetId: string;
  /** Blockchain(s) the requested wallets will be created on. */
  blockchains: string[];
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  /**
   * A base64 string expression of the entity secret ciphertext.
   * The entity secret should be encrypted by the entity public key.
   * Circle mandates that the entity secret ciphertext is unique for each API request.
   */
  entitySecretCiphertext?: string;
  /**
   * An account can be a Smart Contract Account (SCA) or an Externally Owned Account (EOA).
   * To learn more, see the account types guide (https://developers.circle.com/w3s/programmable-wallets-account-types).
   * If an account type is not specified during the creation of a wallet,
   * it defaults to EOA (Externally Owned Account).
   * Note that Solana doesn't support Smart Contract Account (SCA).
   */
  accountType?: string;
  /** Number of wallets that will be created per specified blockchain. */
  count?: number;
  /**
   * List of metadata fields to associate with the corresponding wallet.
   * If count is specified, the amount of items in the array should match the count field.
   */
  metadata?: { [key: string]: any }[];
};

/**
 * Parameters for a list wallets request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets
 */
export type WalletListParameters = {
  /** Filter by the blockchain address of the wallet. */
  address?: string;
  /** Filter by blockchain. */
  blockchain?: string;
  /** Filter by the wallet set. */
  walletSetId?: string;
  /** Filter by the reference identifier. */
  refId?: string;
} & FilterOptions;

/**
 * Parameters for an update wallet request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet
 */
export type WalletUpdateParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /** Name or description associated with the wallet or walletSet. */
  name?: string;
  /** Reference or description used to identify the object. */
  refId?: string;
};

/**
 * Parameters for a wallet token balance request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
 */
export type WalletBalanceParameters = {
  /** Wallet ID */
  id: string;
  /** Return all resources with monitored and non-monitored tokens. */
  includeAll?: boolean;
  /** Filter by token name. */
  name?: string;
  /** Filter by token address. */
  tokenAddress?: string;
  /**
   * Filter by the token standard. ERC20/ERC721/ERC1155 are the standards for EVM chains,
   * Fungible/FungibleAsset/NonFungible/NonFungibleEdition/ProgrammableNonFungible/ProgrammableNonFungibleEdition
   * are the standards for the Solana chain.
   */
  standard?: string;
} & FilterPagesOptions;

/**
 * Parameters for a wallet NFT request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts
 */
export type WalletNftsParameters = {
  /** Wallet ID */
  id: string;
  /** Return all resources with monitored and non-monitored tokens. */
  includeAll?: boolean;
  /** Filter by token name. */
  name?: string;
  /** Filter by token address. */
  tokenAddress?: string;
  /**
   * Filter by the token standard. ERC20/ERC721/ERC1155 are the standards for EVM chains,
   * Fungible/FungibleAsset/NonFungible/NonFungibleEdition/ProgrammableNonFungible/ProgrammableNonFungibleEdition
   * are the standards for the Solana chain.
   */
  standard?: string;
} & FilterPagesOptions;

/**
 * Parameters for a list wallet set request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets
 */
export type WalletSetListParameters = FilterOptions;

/**
 * Parameters for a create wallet set request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set
 */
export type WalletSetCreateParameters = {
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  /** Name or description associated with the wallet or walletSet. */
  name?: string;
  /**
   * A base64 string expression of the entity secret ciphertext.
   * The entity secret should be encrypted by the entity public key.
   * Circle mandates that the entity secret ciphertext is unique for each API request.
   */
  entitySecretCiphertext?: string;
};

/**
 * Parameters for an update wallet set request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set
 */
export type WalletSetUpdateParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /** Name or description associated with the wallet or walletSet. */
  name: string;
};

/**
 * Parameters for a sign message request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-message
 */
export type SignMessageParameters = {
  /**
   * The user friendly message that needs to be signed.
   * If it is a hex string, encodedByHex needs to be TRUE.
   * The hex string should start with “0x” and have even length.
   */
  message: string;
  /** System-generated unique identifier of the resource. */
  walletId: string;
  /**
   * Indicator of whether the input message is encoded by hex.
   * If TRUE, then the message should be a hex string.
   * By default, it is False.
   */
  encodedByHex?: boolean;
  /**
   * The human readable explanation for this sign action.
   * Useful for presenting with extra information.
   */
  memo?: string;
};

/**
 * Parameters for a sign typed data request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-typed-data
 */
export type SignTypedDataParameters = {
  /** A string represents the typed structured data in EIP-712 */
  data: string;
  /** System-generated unique identifier of the resource. */
  walletId: string;
  /**
   * The human readable explanation for this sign action.
   * Useful for presenting with extra information.
   */
  memo?: string;
};

/**
 * Parameters for a sign transaction request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-transaction
 */
export type SignTransactionParameters = {
  /** System-generated unique identifier of the resource. */
  walletId: string;
  /**
   * Raw transaction string that needs to be signed.
   * Excluded with transaction. Required without transaction.
   * Required to be base64 encoded for NEAR, Solana chains.
   * Required to be hex encoded for EVM chains.
   */
  rawTransaction?: string;
  /**
   * Transaction object in JSON that needs to be signed.
   * Excluded with rawTransaction. Required without rawTransaction.
   * NOTE: This field is only supported by EVM chains.
   */
  transaction?: string;
  /**
   * The human readable explanation for this sign action.
   * Useful for presenting with extra information.
   */
  memo?: string;
};

/**
 * Parameters for a sign delegate action request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-delegate-action
 */
export type SignDelegateActionParameters = {
  /**
   * Unsigned delegate action string that needs to be signed.
   * Must be base64 encoded.
   */
  unsignedDelegateAction: string;
  /** System-generated unique identifier of the resource. */
  walletId: string;
};

/**
 * Parameters for a list transactions request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-transactions
 */
export type ListTransactionsParameters = {
  /** Filter by blockchain. */
  blockchain?: string;
  /** Filter by the custody type. */
  custodyType?: string;
  /** Filter by the destination address. */
  destinationAddress?: string;
  /** Return all resources with monitored and non-monitored tokens. */
  includeAll?: boolean;
  /** Filter by the operation of the transaction. */
  operation?: string;
  /** Filter by the state of the transaction. */
  state?: string;
  /** Filter on the transaction hash of the transaction. */
  txHash?: string;
  /** Filter by on the transaction type. */
  txType?: string;
  /** Filter by the wallet IDs, this parameter is a comma separated list of ids. */
  walletIds?: string;
} & FilterOptions;

/**
 * Parameters for a get transaction request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-transaction
 */
export type GetTransactionParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /** Filter by on the transaction type. */
  txType?: string;
};

/**
 * Parameters for a create transfer transaction request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-transfer
 */
export type CreateTransferTransactionParameters = {
  /**
   * Unique system generated identifier of the wallet.
   * Required when sourceAddress and blockchain are not provided.
   * Mutually exclusive with sourceAddress and blockchain.
   */
  walletId: string;
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  destinationAddress: string;
  /**
   * Transfer amounts in decimal number format, at least one element is required for transfer.
   * For ERC721 token transfer, the amounts field is required to be ["1"] (array with "1" as the only element).
   */
  amounts: string[];
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  nftTokenIds?: string[];
  /** Optional reference or description used to identify the transaction. */
  refId?: string;
  /** System generated identifier of the token. Excluded with tokenAddress and tokenBlockchain. */
  tokenId?: string;
  /** Blockchain address of the transferred token. Empty for native tokens. Excluded with tokenId. */
  tokenAddress?: string;
  /**
   * Blockchain of the transferred token. Required if tokenId is not provided.
   * The blockchain and tokenId fields are mutually exclusive.
   */
  blockchain?: string;
} & FeeType;

/**
 * Parameters for an estimate
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-template-deploy
 */
export type EstimateContractDeploymentFeeParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /**
   * The blockchain network that the resource is to be created on or is currently on.
   * Required along with sourceAddress if you don't provide walletId.
   * The blockchain and walletId fields are mutually exclusive.
   */
  blockchain: string;
  /**
   * Source address of the transaction. Required along with blockchain if walletId is not provided.
   * The sourceAddress and walletId fields are mutually exclusive.
   */
  sourceAddress?: string;
  /** JSON object that contains the template deployment parameters used to initialize the contract(s) on-chain. */
  templateParameters?: { [key: string]: any };
  /**
   * Unique system generated identifier of the wallet.
   * Required when sourceAddress and blockchain are not provided.
   * Mutually exclusive with sourceAddress and blockchain.
   * For contract deploys this wallet ID will be used as the source.
   */
  walletId?: string;
};

/**
 * Parameters for a deploy contract from template request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract-template
 */
export type DeployContractTemplateParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /**
   * A base64 string expression of the entity secret ciphertext.
   * The entity secret should be encrypted by the entity public key.
   * Circle mandates that the entity secret ciphertext is unique for each API request.
   */
  entitySecretCiphertext?: string;
  /** Name of the contract in your Circle console. */
  name: string;
  /** System-generated unique identifier of the resource. */
  walletId: string;
  /**
   * The blockchain network that the resource is to be created on or is currently on.
   * Required along with sourceAddress if you don't provide walletId.
   * The blockchain and walletId fields are mutually exclusive.
   */
  blockchain: string;
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  /** Description of the contract. */
  description?: string;
  /** JSON object that contains the template deployment parameters used to initialize the contract(s) on-chain. */
  templateParameters?: { [key: string]: any };
  /** RefID is a custom label field. */
  refId?: string;
} & FeeType;

/**
 * Parameters for a list contracts request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-contracts
 */
export type ListContractsParameters = {
  /** Filter by blockchain. */
  blockchain?: string;
  /** Filter contracts by input type. */
  contractInputType?: string;
  /** Filter contracts by deployer address. */
  deployerAddress?: string;
  /** Filter contracts by name. */
  name?: string;
  /** Filter contracts by status. */
  status?: string;
  /** Queries items created since the specified date-time (inclusive) in ISO 8601 format. */
  from?: string;
  /** Queries items created before the specified date-time (inclusive) in ISO 8601 format. */
  to?: string;
} & FilterPagesOptions;

/**
 * Parameters for an update contract request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-contract
 */
export type UpdateContractParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /** The name for a contract. Must be alphanumeric [a-zA-Z0-9]. */
  name?: string;
  /** The description for a contract. */
  description?: string;
  /**
   * The archive state of the contract.
   * If true, the contract will not be visible in your dashboard.
   */
  archived?: boolean;
};

/**
 * Parameters for an import contract request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/import-contract
 */
export type ImportContractParameters = {
  /**
   * The blockchain network that the resource is to be created on or is currently on.
   * Required along with sourceAddress if you don't provide walletId.
   * The blockchain and walletId fields are mutually exclusive.
   */
  blockchain: string;
  /** The on-chain address of this contract. */
  address: string;
  /** The name for a contract. Must be alphanumeric [a-zA-Z0-9]. */
  name: string;
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  /** The description for a contract. */
  description?: string;
};

type ContractDeploymentRequiredParams =
  | {
      /**
       * Unique system generated identifier of the wallet.
       * Required when sourceAddress and blockchain are not provided.
       * Mutually exclusive with sourceAddress and blockchain.
       * For contract deploys this wallet ID will be used as the source.
       */
      walletId: string;
    }
  | {
      /**
       * The blockchain network that the resource is to be created on or is currently on.
       * Required along with sourceAddress if you don't provide walletId.
       * The blockchain and walletId fields are mutually exclusive.
       */
      blockchain: string;
      /**
       * Source address of the transaction.
       * Required along with blockchain if walletId is not provided.
       * The sourceAddress and walletId fields are mutually exclusive.
       */
      sourceAddress: string;
    };

/**
 * Parameters for an estimate contract deployment request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-deploy
 */
export type EstimateContractDeploymentParameters = {
  /** Bytecode of the contract being deployed. */
  bytecode: string;
  /** The contract's ABI */
  abiJson?: string | object;

  /** Signature of the constructor if the contract has one. constructor() by default. */
  constructorSignature?: string;
  /**
   * A list of arguments to pass to the contract's constructor function.
   * Must be an empty array if there are no constructor parameters.
   */
  constructorParameters?: (string | number | boolean)[];
} & ContractDeploymentRequiredParams;

type FeeType =
  | {
      /**
       * A dynamic blockchain fee level setting (LOW, MEDIUM, or HIGH)
       * that will be used to pay gas for the transaction. Calculated based on network traffic,
       * supply of validators, and demand for transaction verification.
       * Cannot be used with gasPrice, priorityFee, or maxFee.
       */
      feeLevel: string;
    }
  | {
      /**
       * The maximum units of gas to use for the transaction. Required if feeLevel is not provided.
       * GasLimit override (only supported for EOA wallets): Using gasLimit together with feeLevel,
       * the provided gasLimit is required to be greater or equal to feeLevel estimation
       * and will override the estimation's gasLimit.
       */
      gasLimit: string;
      /**
       * A dynamic blockchain fee level setting (LOW, MEDIUM, or HIGH)
       * that will be used to pay gas for the transaction. Calculated based on network traffic,
       * supply of validators, and demand for transaction verification.
       * Cannot be used with gasPrice, priorityFee, or maxFee.
       */
      feeLevel?: string;
    }
  | {
      /**
       * The maximum units of gas to use for the transaction. Required if feeLevel is not provided.
       * GasLimit override (only supported for EOA wallets): Using gasLimit together with feeLevel,
       * the provided gasLimit is required to be greater or equal to feeLevel estimation
       * and will override the estimation's gasLimit.
       */
      gasLimit: string;
      /**
       * For blockchains without EIP-1559 support, the maximum price of gas, in gwei,
       * to use per each unit of gas (see gasLimit). Requires gasLimit.
       * Cannot be used with feeLevel, priorityFee, or maxFee.
       */
      gasPrice: string;
      feeLevel: never;
      priorityFee: never;
      maxFee: never;
    }
  | {
      /**
       * The maximum units of gas to use for the transaction. Required if feeLevel is not provided.
       * GasLimit override (only supported for EOA wallets): Using gasLimit together with feeLevel,
       * the provided gasLimit is required to be greater or equal to feeLevel estimation
       * and will override the estimation's gasLimit.
       */
      gasLimit: string;
      /**
       * For blockchains with EIP-1559 support, the maximum price per unit of gas (see gasLimit),
       * in gwei. Requires priorityFee, and gasLimit to be present.
       * Cannot be used with feeLevel or gasPrice.
       */
      maxFee: string;
      /**
       * For blockchains with EIP-1559 support, the “tip”, in gwei,
       * to add to the base fee as an incentive for validators.
       * Please note that the maxFee and gasLimit parameters are required alongside the priorityFee.
       * The feeLevel and gasPrice parameters cannot be used with the priorityFee.
       */
      priorityFee: string;
      /** Optional reference or description used to identify the transaction. */
      feeLevel: never;
      gasPrice: never;
    };

/**
 * Parameters for a deploy contract request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract
 */
export type DeployContractParameters = {
  /**
   * The blockchain network that the resource is to be created on or is currently on.
   * Required along with sourceAddress if you don't provide walletId.
   * The blockchain and walletId fields are mutually exclusive.
   */
  blockchain: string;
  /**
   * A base64 string expression of the entity secret ciphertext.
   * The entity secret should be encrypted by the entity public key.
   * Circle mandates that the entity secret ciphertext is unique for each API request.
   */
  entitySecretCiphertext?: string;
  /** Bytecode of the contract being deployed. */
  bytecode: string;
  /** The contract's ABI */
  abiJson: string | object;
  /**
   * Unique system generated identifier of the wallet.
   * Required when sourceAddress and blockchain are not provided.
   * Mutually exclusive with sourceAddress and blockchain.
   * For contract deploys this wallet ID will be used as the source.
   */
  walletId: string;
  /** The name for a contract. Must be alphanumeric [a-zA-Z0-9]. */
  name: string;
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  /** The description for a contract. */
  description?: string;
  /**
   * A list of arguments to pass to the contract's constructor function.
   * Must be an empty array if there are no constructor parameters.
   */
  constructorParameters?: (string | number | boolean)[];

  refId?: string;
} & FeeType;

/**
 * Parameters for a query contract request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/query-contract
 */
export type QueryContractParameters = {
  /**
   * The blockchain network that the resource is to be created on or is currently on.
   * Required along with sourceAddress if you don't provide walletId.
   * The blockchain and walletId fields are mutually exclusive.
   */
  blockchain: string;
  /** Address of the contract to be queried. */
  address: string;
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
  abiParameters?: (string | number | boolean | any[])[];
  /** The contract's ABI in a JSON stringified format. */
  abiJson?: string;
  /** CallData is input data that encodes method and parameters. */
  callData?: string;
  /** FromAddress is the address that will populate msg.sender in the contract call. */
  fromAddress?: string;
};

/**
 * Parameters for a get event monitors request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-event-monitors
 */
export type GetEventMonitorsParameters = {
  /** Filter contracts by address. */
  contractAddress?: string;
  /** Filter by blockchain. */
  blockchain?: string;
  /** Filter monitors by event signature. */
  eventSignature?: string;
  /** Queries items created since the specified date-time (inclusive) in ISO 8601 format. */
  from?: string;
  /** Queries items created before the specified date-time (inclusive) in ISO 8601 format. */
  to?: string;
} & FilterPagesOptions;

/**
 * Parameters for a create event monitor request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/create-event-monitor
 */
export type CreateEventMonitorParameters = {
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  /** The specific event to which you want to subscribe. Please ensure no spaces are included. */
  eventSignature: string;
  /** The on-chain address of this contract. */
  contractAddress: string;
  blockchain: string;
};

/**
 * Parameters for an update event monitor request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-event-monitor
 */
export type UpdateEventMonitorParameters = {
  /** Event Monitor ID. */
  id: string;
  /** Indicates whether the event monitor should be active (true) or inactive (false). */
  isEnabled: boolean;
};

/**
 * Parameters for a delete event monitor request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/delete-event-monitor
 */
export type DeleteEventMonitorParameters = {
  /** Event Monitor ID. */
  id: string;
};

/**
 * Parameters for a get event logs request
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-event-logs
 */
export type GetEventLogsParameters = {
  /** Filter contracts by address. */
  contractAddress?: string;
  /** Filter by blockchain. */
  blockchain?: string;
  /** Queries items created since the specified date-time (inclusive) in ISO 8601 format. */
  from?: string;
  /** Queries items created before the specified date-time (inclusive) in ISO 8601 format. */
  to?: string;
} & FilterPagesOptions;

/**
 * Parameters for a validate address request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-validate-address
 */
export type ValidateAddressParameters = {
  /** The blockchain network that the resource is to be created on or is currently on. */
  blockchain: string;
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  address: string;
};

/**
 * Parameters for a estimate contract execution transaction request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transaction-estimate-fee
 */
export type EstimateContractExecutionFeeParameters = {
  /** The blockchain address of the contract to be executed. */
  contractAddress: string;
  /**
   * The contract ABI function signature or callData field is required for interacting with the smart contract.
   * The ABI function signature cannot be used simultaneously with callData. e.g. burn(uint256)
   */
  abiFunctionSignature?: string;
  /**
   * The contract ABI function signature parameters for executing the contract interaction.
   * Supported parameter types include string, integer, boolean, and array.
   * These parameters should be used exclusively with the abiFunctionSignature and cannot be used with callData.
   */
  abiParameters?: (string | number | boolean | any[])[];
  /**
   * The raw transaction data, must be an even-length hexadecimal string with the 0x prefix, to be executed.
   * It is important to note that the usage of callData is mutually exclusive with the abiFunctionSignature
   * and abiParameters. Therefore, callData cannot be utilized simultaneously with either abiFunctionSignature
   * or abiParameters.
   */
  callData?: string;
  /**
   * The amount of native token that will be sent to the contract abi execution.
   * Optional field for payable api only, if not provided, no native token will be sent.
   */
  amount?: string;
  /**
   * Blockchain associated with the transaction. Required along with sourceAddress if you don't provide walletId.
   * The blockchain and walletId fields are mutually exclusive.
   */
  blockchain: string;
  /**
   * Source address of the transaction. Required along with blockchain if walletId is not provided.
   * The sourceAddress and walletId fields are mutually exclusive.
   */
  sourceAddress?: string;
  /**
   * Unique system generated identifier of the wallet.
   * Required when sourceAddress and blockchain are not provided.
   * Mutually exclusive with sourceAddress and blockchain.
   */
  walletId?: string;
};

/**
 * Parameters for an estimate transfer transaction request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transfer-estimate-fee
 */
export type EstimateTransferFeeParameters = {
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  destinationAddress: string;
  /**
   * Transfer amounts in decimal number format, at least one element is required for transfer.
   * For ERC721 token transfer, the amounts field is required to be ["1"] (array with "1" as the only element).
   */
  amounts: string[];
  /**
   * List of NFT token IDs corresponding with the NFTs to transfer.
   * Batch transfers are supported only for ERC-1155 tokens.
   * The length of NFT token IDs must match the length of amounts.
   */
  nftTokenIds?: string[];
  /**
   * Source address of the transaction. Required along with blockchain if walletId is not provided.
   * The sourceAddress and walletId fields are mutually exclusive.
   */
  sourceAddress?: string;
  /** System generated identifier of the token. Excluded with tokenAddress and tokenBlockchain. */
  tokenId?: string;
  /** Blockchain address of the transferred token. Empty for native tokens. Excluded with tokenId. */
  tokenAddress?: string;
  /**
   * Blockchain of the transferred token. Required if tokenId is not provided.
   * The blockchain and tokenId fields are mutually exclusive.
   */
  blockchain: string;
  /**
   * Unique system generated identifier of the wallet.
   * Required when sourceAddress and blockchain are not provided.
   * Mutually exclusive with sourceAddress and blockchain.
   */
  walletId?: string;
};

/**
 * Parameters for a create contract execution transaction request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-contract-execution
 */
export type CreateContractExecutionTransactionParameters = {
  /**
   * Unique system generated identifier of the wallet.
   * Required when sourceAddress and blockchain are not provided.
   * Mutually exclusive with sourceAddress and blockchain.
   */
  walletId: string;
  /**
   * A base64 string expression of the entity secret ciphertext.
   * The entity secret should be encrypted by the entity public key.
   * Circle mandates that the entity secret ciphertext is unique for each API request.
   */
  entitySecretCiphertext?: string;
  /** The blockchain address of the contract to be executed. */
  contractAddress: string;
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
  /**
   * The contract ABI function signature or callData field is required for interacting with the smart contract.
   * The ABI function signature cannot be used simultaneously with callData. e.g. burn(uint256)
   */
  abiFunctionSignature?: string;
  /**
   * The contract ABI function signature parameters for executing the contract interaction.
   * Supported parameter types include string, integer, boolean, and array.
   * These parameters should be used exclusively with the abiFunctionSignature and cannot be used with callData.
   */
  abiParameters?: (string | number | boolean | any[])[];
  /**
   * The raw transaction data, must be an even-length hexadecimal string with the 0x prefix, to be executed.
   * It is important to note that the usage of callData is mutually exclusive with the abiFunctionSignature
   * and abiParameters. Therefore, callData cannot be utilized simultaneously with either abiFunctionSignature
   * or abiParameters.
   */
  callData?: string;
  /**
   * The amount of native token that will be sent to the contract abi execution.
   * Optional field for payable api only, if not provided, no native token will be sent.
   */
  amount?: string;
  /** Optional reference or description used to identify the transaction. */
  refId?: string;
} & FeeType;

/**
 * Parameters for a cancel transaction request
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-cancel
 */
export type CancelTransactionParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /**
   * A base64 string expression of the entity secret ciphertext.
   * The entity secret should be encrypted by the entity public key.
   * Circle mandates that the entity secret ciphertext is unique for each API request.
   */
  entitySecretCiphertext?: string;
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
};

export type AccelerateTransactionParameters = {
  /** The universally unique identifier of the resource. */
  id: string;
  /**
   * A base64 string expression of the entity secret ciphertext.
   * The entity secret should be encrypted by the entity public key.
   * Circle mandates that the entity secret ciphertext is unique for each API request.
   */
  entitySecretCiphertext?: string;
  /**
   * Universally unique identifier (UUID v4) idempotency key.
   * This key is utilized to ensure exactly-once execution of mutating requests.
   * To create a UUIDv4 go to uuidgenerator.net. If the same key is reused,
   * it will be treated as the same request and the original response will be returned.
   */
  idempotencyKey?: string;
};

/**
 * Response types
 */

/**
 * A developer controlled wallet set
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-set
 */
export type WalletSet = {
  /** System-generated unique identifier of the resource. */
  id: string;
  /** Date and time the resource was created, in ISO-8601 UTC format. */
  createDate: string;
  /** Date and time the resource was last updated, in ISO-8601 UTC format. */
  updateDate: string;
  custodyType: string;
  /** Name or description associated with the wallet or walletSet. */
  name?: string;
};

/**
 * The token balances of a wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
 */
export type WalletTokenBalances = {
  /** The token balance amount */
  amount: string;
  token: {
    /** System-generated unique identifier of the resource. */
    id: string;
    /** Blockchain name of the specified token. */
    name: string;
    standard: string;
    /** The blockchain network that the resource is to be created on or is currently on. */
    blockchain: string;
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
};

/**
 * NFTs for a wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts
 */
export type WalletNft = {
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
    blockchain: string;
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
};

/**
 * A wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet
 */
export type Wallet = {
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
  blockchain: string;
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
  state: string; // If the state can only have specific values, you can use string literals like 'LIVE' | 'INACTIVE'
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
};

/**
 * A signed transaction
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-transaction
 */
export type SignedTransaction = {
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
};

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
export type Transaction = {
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
  abiParameters?: (string | number)[];
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
  blockchain: string;
  /** The blockchain address of the contract to be executed. */
  contractAddress?: string;
  /** Date and time the resource was created, in ISO-8601 UTC format. */
  createDate: string;
  /** Describes who controls the digital assets in a wallet: either the end-user or the developer. */
  custodyType: string;
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  destinationAddress?: string;
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
  feeLevel?: string;
  /** Date the transaction was first confirmed in a block. ISO-8601 UTC date/time. */
  firstConfirmDate?: string;
  /** Gas fee, in native token, paid to the network for the transaction. */
  networkFee?: string;
  /** Gas fee, in USD, paid to the network for the transaction. */
  networkFeeInUSD?: string;
  /** List of Nfts, in JSON string format, associated with the transaction. */
  nfts?: string[];
  /** Operation type of the transaction. */
  operation: string;
  /** Optional reference or description used to identify the transaction. */
  refId?: string;
  /**
   * Blockchain generated unique identifier, associated with wallet (account),
   * smart contract or other blockchain objects.
   */
  sourceAddress?: string;
  /** Current state of the transaction. */
  state: string;
  /** System-generated unique identifier of the resource. */
  tokenId?: string;
  transactionType: string;
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
};

/**
 * A transfer transaction
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-transfer
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-contract-execution
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-cancel
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-accelerate
 */
export type Transfer = {
  /** System-generated unique identifier of the resource. */
  id: string;
  /** Current state of the transaction. */
  state?: string;
};

/**
 * An estimate of a fee
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-deploy
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-template-deploy
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transaction-estimate-fee
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transfer-estimate-fee
 */
export type EstimateFee = {
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
};

/**
 * A token
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-token-id
 */
export type Token = {
  /** System-generated unique identifier of the resource. */
  id: string;
  /** Blockchain name of the specified token. */
  name: string;
  standard: string;
  /** The blockchain network that the resource is to be created on or is currently on. */
  blockchain: string;
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
};

/**
 * A response from a request to deploy a contract from a template
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract-template
 */
export type DeployContractFromTemplate = {
  /** Unique identifiers of the created smart contracts. */
  contractIds: string[];
  /** Unique identifier of the pending deployment transaction. transaction. */
  transactionId: string;
};

/**
 * A deployed contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract
 */
export type DeployContract = {
  /** Unique identifier of the created smart contract. */
  contractId: string;
  /** Unique identifier of the deployment transaction. */
  transactionId: string;
};

/**
 * The result of querying a contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/query-contract
 */
export type QueryContract = {
  /** Output for the ABI interaction. */
  outputValues: any[];
  /** OutputData is output in hex format. */
  outputData: string;
};

/**
 * Information about a smart contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-contracts
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-contract
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/import-contract
 */
export type Contract = {
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
  blockchain: string;
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
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
    outputs?: {
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
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
  }[];
  /** Object of the implementation contract. */
  implementationContract?: any;
};

/**
 * An event monitor
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-event-monitors
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/create-event-monitor
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-event-monitor
 */
export type EventMonitor = {
  id: string;
  blockchain: string;
  /** The on-chain address of this contract. */
  contractAddress: string;
  eventSignature: string;
  eventSignatureHash: string;
  isEnabled: boolean;
  createDate: string;
  updateDate: string;
};

/**
 * An event log
 * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-event-logs
 */
export type EventLog = {
  blockHash: string;
  blockHeight: number;
  blockchain: string;
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
};

/**
 * An entity's configuration
 * https://developers.circle.com/api-reference/w3s/programmable-wallets/get-entity-config
 */
export type ConfigEntity = {
  /** System-generated unique identifier of the entity's app. */
  appId: string;
};
export type RegisteredEntity = {
  /** System-generated unique identifier of the entity's app. */
  recoveryFile: string;
};
