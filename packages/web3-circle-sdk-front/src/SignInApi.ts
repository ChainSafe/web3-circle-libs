import { BaseApi } from './BaseApi';

export class SignInApi extends BaseApi {
  protected publicKey?: string;
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  signIn(username: string, password: any): Promise<{ accessToken: string }> {
    return this.postRequest<{ accessToken: string }>('/signIn', {
      username,
      password,
    });
  }
}
