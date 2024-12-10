import { BaseApi } from './BaseApi';
import type { ScreenAddressParameters, ScreenResult } from './types';

export class ComplianceApi extends BaseApi {
  /**
   * Create a screening request for a specific blockchain address and chain.
   * https://developers.circle.com/api-reference/w3s/compliance/screen-address
   * @param params the parameters for the set monitored tokens request
   * @returns ScreenResult
   */
  async screenAddress(params: ScreenAddressParameters): Promise<ScreenResult> {
    return this.postRequest<ScreenResult>(
      '/w3s/compliance/screening/addresses',
      this.addIdempotencyKeyToParams(params),
    );
  }
}
