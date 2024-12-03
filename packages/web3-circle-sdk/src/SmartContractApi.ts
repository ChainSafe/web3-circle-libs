import { DeveloperApi } from './DeveloperApi';
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

export class SmartContractApi extends DeveloperApi {
  /**
   * Fetch a list of contracts that you've imported and/or deployed.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-contracts
   * @param params the parameters for the list contracts request
   * @returns the list of contracts
   */
  async list(params?: ListContractsParameters): Promise<Contract[]> {
    return this.getRequest<Contract[]>('/w3s/contracts', params, 'contracts');
  }

  /**
   * Get a single contract that you've imported or deployed.
   * Retrieved using the contracts ID as opposed to the on-chain address.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-contract
   * @param id the universally unique identifier of the resource
   * @returns the requested contract
   */
  async get(id: string): Promise<Contract> {
    return this.getRequest<Contract>(`/w3s/contracts/${id}`, undefined, 'contract');
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
    return this.patchRequest<Contract>(`/w3s/contracts`, params, 'contract');
  }

  /**
   * Add an existing smart contract to your library of contracts.
   * It also can be done in the Web3 Services Console.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/import-contract
   * @param params the parameters for the import contract request
   * @returns the imported contract
   */
  async importContract(params: ImportContractParameters): Promise<Contract> {
    return this.postRequest<Contract>('/w3s/contracts/import', params, 'contract');
  }

  /**
   * Estimate the network fee for deploying a smart contract on a specified blockchain,
   * given the contract bytecode.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-deploy
   * @param params the parameters for the estimate deployment request
   * @returns the fee estimate
   */
  async estimateDeployment(
    params: EstimateContractDeploymentParameters,
  ): Promise<EstimateFee> {
    return this.postRequest<EstimateFee>(
      '/w3s/contracts/deploy/estimateFee',
      this.prepareAbiParams(params),
    );
  }
  private prepareAbiParams(
    params: EstimateContractDeploymentParameters | DeployContractParameters,
  ): EstimateContractDeploymentParameters | DeployContractParameters {
    const formattedParams = { ...params };
    if (
      typeof formattedParams.abiJson === 'object' &&
      Array.isArray(formattedParams.abiJson)
    ) {
      {
        formattedParams.abiJson = JSON.stringify(formattedParams.abiJson);
      }
    }
    return formattedParams;
  }
  /**
   * Deploy a smart contract on a specified blockchain using the contract's ABI and bytecode.
   * The deployment will originate from one of your Circle Programmable Wallets.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract
   * @param params the parameters for the deploy contract request
   * @returns the deployed contract
   */
  async deploy(params: DeployContractParameters): Promise<DeployContract> {
    const data =
      await this.addCipherTextAndIdempotencyKeyToParams<DeployContractParameters>(params);
    return this.postRequest<DeployContract>(
      '/w3s/contracts/deploy',
      this.prepareAbiParams(data),
    );
  }

  /**
   * Query the state of a contract by providing the address and blockchain.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/query-contract
   * @param params the parameters for the query contract request
   * @returns the result of querying the contract
   */
  async query(params: QueryContractParameters): Promise<QueryContract> {
    return this.postRequest<QueryContract>('/w3s/contracts/query', params);
  }
}
