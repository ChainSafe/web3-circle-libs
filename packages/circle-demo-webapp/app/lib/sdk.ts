import { CircleSdk } from 'web3-circle-sdk';

const apiKey = process.env.CIRCLE_API_KEY!;
const secret = process.env.CIRCLE_SECRET!;

export const sdk = new CircleSdk(apiKey, secret);
