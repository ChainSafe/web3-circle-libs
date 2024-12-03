import { DeveloperApi } from './DeveloperApi';
import type {
  EstimateContractDeploymentFeeParameters,
  DeployContractTemplateParameters,
  EstimateFee,
  DeployContractFromTemplate,
} from './types';

export class SmartContractTemplateApi extends DeveloperApi {
  /**
   * Estimate the fee required to deploy contract by template.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-template-deploy
   * @param params the parameters for the estimate template deployment fee request
   * @returns the estimate of the template deployment fee
   */
  async estimateDeploymentFee(
    params: EstimateContractDeploymentFeeParameters,
  ): Promise<EstimateFee> {
    const { id, ...rest } = params;
    return this.postRequest<EstimateFee>(`/templates/${id}/deploy/estimateFee`, rest);
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
    const { id, ...rest } = params;
    const data =
      await this.addCipherTextAndIdempotencyKeyToParams<
        Omit<DeployContractTemplateParameters, 'id'>
      >(rest);
    return this.postRequest<DeployContractFromTemplate>(`/templates/${id}/deploy`, data);
  }
}
