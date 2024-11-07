import { DeveloperApi } from "./DeveloperApi";
import {
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
} from "./types";

export class SmartContractApi extends DeveloperApi {
  async list(params?: ListContractsParameters): Promise<Contract[]> {
    return this.getRequest<Contract[]>("/contracts", params, "contracts");
  }
  async get(id: string): Promise<Contract> {
    return this.getRequest<Contract>(`/contracts/${id}`, undefined, "contract");
  }
  async update(params: UpdateContractParameters): Promise<Contract> {
    return this.patchRequest<Contract>(`/contracts`, params, "contract");
  }
  async importContract(params: ImportContractParameters): Promise<Contract> {
    return this.postRequest<Contract>("/contracts/import", params, "contract");
  }
  async estimateDeployment(
    params: EstimateContractDeploymentParameters,
  ): Promise<EstimateFee> {
    return this.postRequest<EstimateFee>(
      "/contracts/deploy/estimateFee",
      params,
    );
  }
  async deploy(params: DeployContractParameters): Promise<DeployContract> {
    return this.postRequest<DeployContract>("/contracts/deploy", params);
  }
  async query(params: QueryContractParameters): Promise<QueryContract> {
    return this.postRequest<QueryContract>("/contracts/query", params);
  }
}
