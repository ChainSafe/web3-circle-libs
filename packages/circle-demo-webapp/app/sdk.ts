import { CircleSDK } from 'web3-circle-sdk';

const apiKey = process.env.CIRCLE_API_KEY as string;
const secret = process.env.CIRCLE_SECRET as string;

export const sdk = new CircleSDK(apiKey, secret);
