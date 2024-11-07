import {
  EstimateContractDeploymentFeeParameters,
  DeployContractTemplateParameters,
  EstimateFee,
  DeployContractFromTemplate,
} from "./types";
import { DeveloperApi } from "./DeveloperApi";

export class SmartContractTemplateApi extends DeveloperApi {
  async estimateDeploymentFee(
    params: EstimateContractDeploymentFeeParameters,
  ): Promise<EstimateFee> {
    const { id, ...rest } = params;
    return this.postRequest<EstimateFee>(
      `/templates/${id}/deploy/estimateFee`,
      rest,
    );
  }
  async deployContract(
    params: DeployContractTemplateParameters,
  ): Promise<DeployContractFromTemplate> {
    const { id, ...rest } = params;
    return this.postRequest<DeployContractFromTemplate>(
      `/templates/${id}/deploy`,
      rest,
    );
  }
}
