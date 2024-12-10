import type {
  EstimateContractDeploymentFeeParameters,
  DeployContractTemplateParameters,
  EstimateFee,
  DeployContractFromTemplate,
} from './types';
import { BaseApi } from './BaseApi';

export class SmartContractTemplateApi extends BaseApi {
  /**
   * Estimate the fee required to deploy contract by template.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-template-deploy
   * @param params the parameters for the estimate template deployment fee request
   * @returns the estimate of the template deployment fee
   */
  async estimateDeploymentFee(
    params: EstimateContractDeploymentFeeParameters,
  ): Promise<EstimateFee> {
    return this.execute<EstimateFee>(
      'smartContractTemplate',
      'estimateDeploymentFee',
      params,
    );
  }

  /**
   * Deploy a smart contract using a template.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract-template
   * @param params the parameters for the deploy contract from template request
   * @returns the contract(s) deployed from the template
   */
  async deploy(
    params: DeployContractTemplateParameters,
  ): Promise<DeployContractFromTemplate> {
    return this.execute<DeployContractFromTemplate>(
      'smartContractTemplate',
      'deploy',
      params,
    );
  }
}
