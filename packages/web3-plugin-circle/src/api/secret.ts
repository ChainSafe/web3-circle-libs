import crypto from "crypto";
import forge from "node-forge";
import { Api } from "./base";

type PublicKey = {
  publicKey: string;
};
export class SecretApi extends Api {
  static generateSecret(): string {
    return crypto.randomBytes(32).toString("hex");
  }
  static getEntitySecretCiphertext(secret: string, pemKey: string): string {
    const entitySecret = forge.util.hexToBytes(secret);
    const publicKey = forge.pki.publicKeyFromPem(pemKey);
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    });

    return forge.util.encode64(encryptedData);
  }
  async getPublicKey(): Promise<string> {
    const res = await this.getRequest<never, PublicKey>(
      "/config/entity/publicKey",
    );
    return res.publicKey;
  }
}