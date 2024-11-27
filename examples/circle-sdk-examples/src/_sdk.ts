import dotenv from 'dotenv';
import { CircleSDK } from 'web3-plugin-circle';

dotenv.config({ path: '../../.env' });

const apiKey = process.env.CIRCLE_API_KEY as string;
const secret = process.env.CIRCLE_SECRET as string;

export const sdk = new CircleSDK(apiKey, secret);
