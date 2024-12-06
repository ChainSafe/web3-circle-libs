import { BaseApi } from './BaseApi';

export class ExecuteApi extends BaseApi {
  constructor(baseUrl: string, authToken: string) {
    super(baseUrl, authToken);
  }
}
