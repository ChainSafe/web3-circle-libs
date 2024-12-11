import dotenv from 'dotenv';
import { CircleSdk } from 'web3-circle-sdk';

dotenv.config({ path: '../../.env' });

export const apiKey = process.env.CIRCLE_API_KEY as string;
export const secret = process.env.CIRCLE_SECRET as string;

export const sdk = new CircleSdk(apiKey, secret);
