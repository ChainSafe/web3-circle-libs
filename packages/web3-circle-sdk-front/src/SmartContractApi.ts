import type {
  Contract,
  DeployContract,
  DeployContractParameters,
  EstimateContractDeploymentParameters,
  EstimateFee,
  ImportContractParameters,
  ListContractsParameters,
  QueryContract,
  QueryContractParameters,
  UpdateContractParameters,
} from './types';
import { BaseApi } from './BaseApi';

export class SmartContractApi extends BaseApi {
  /**
   * Fetch a list of contracts that you've imported and/or deployed.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-contracts
   * @param params the parameters for the list contracts request
   * @returns the list of contracts
   */
  async list(params?: ListContractsParameters): Promise<Contract[]> {
    return this.execute<Contract[]>('smartContract', 'list', params);
  }

  /**
   * Get a single contract that you've imported or deployed.
   * Retrieved using the contracts ID as opposed to the on-chain address.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-contract
   * @param id the universally unique identifier of the resource
   * @returns the requested contract
   */
  async get(id: string): Promise<Contract> {
    return this.execute<Contract>('smartContract', 'get', id);
  }

  /**
   * Update the off-chain properties, such as description,
   * of a contract that you've imported or deployed.
   * Updated using the contracts ID as opposed to the on-chain address.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-contract
   * @param params the parameters for the update contract request
   * @returns the updated contract
   */
  async update(params: UpdateContractParameters): Promise<Contract> {
    return this.execute<Contract>('smartContract', 'update', params);
  }

  /**
   * Add an existing smart contract to your library of contracts.
   * It also can be done in the Web3 Services Console.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/import-contract
   * @param params the parameters for the import contract request
   * @returns the imported contract
   */
  async import(params: ImportContractParameters): Promise<Contract> {
    return this.execute<Contract>('smartContract', 'import', params);
  }

  /**
   * Estimate the network fee for deploying a smart contract on a specified blockchain,
   * given the contract bytecode.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-deploy
   * @param params the parameters for the estimate deployment request
   * @returns the fee estimate
   */
  async estimateDeploymentFee(
    params: EstimateContractDeploymentParameters,
  ): Promise<EstimateFee> {
    return this.execute<EstimateFee>('smartContract', 'estimateDeploymentFee', params);
  }

  /**
   * Deploy a smart contract on a specified blockchain using the contract's ABI and bytecode.
   * The deployment will originate from one of your Circle Programmable Wallets.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract
   * @param params the parameters for the deploy contract request
   * @returns the deployed contract
   */
  async deploy(params: DeployContractParameters): Promise<DeployContract> {
    return this.execute<DeployContract>('smartContract', 'deploy', params);
  }

  /**
   * Query the state of a contract by providing the address and blockchain.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/query-contract
   * @param params the parameters for the query contract request
   * @returns the result of querying the contract
   */
  async query(params: QueryContractParameters): Promise<QueryContract> {
    return this.execute<QueryContract>('smartContract', 'query', params);
  }
}
