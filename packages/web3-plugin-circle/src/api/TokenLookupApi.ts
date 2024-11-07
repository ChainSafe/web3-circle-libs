import { BaseApi } from "./BaseApi";
import { Token } from "./types";

export class TokenLookupApi extends BaseApi {
  async get(id: string): Promise<Token> {
    return this.getRequest<Token>(`/tokens/${id}`, undefined, "token");
  }
}
