import { SignInApi } from './SignInApi';
import { CircleSdk } from './index';

const serverURl = 'http://localhost:4000';

const test = async () => {
  const signInApi = new SignInApi(serverURl);
  const { accessToken } = await signInApi.signIn('admin', 'password123');

  const sdk = new CircleSdk(serverURl, accessToken);

  const sdkRes = await sdk.wallet.get('d9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7');
  console.log(sdkRes);
};

test().catch(console.error);
