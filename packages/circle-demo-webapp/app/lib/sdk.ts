import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

const apiKey = process.env.CIRCLE_API_KEY!;
const entitySecret = process.env.CIRCLE_SECRET!;
export const sdk = initiateDeveloperControlledWalletsClient({
  apiKey,
  entitySecret,
});
