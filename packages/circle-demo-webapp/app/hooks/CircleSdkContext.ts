import { createContext } from 'react';

// this is just a mock for now
export class CircleClient {
  constructor() {
    console.log('CircleClient created');
  }

  getBalance() {
    return BigInt(100);
  }
}

export interface ICircleSdkContext {
  client: CircleClient;
}

export const CircleSdkContext = createContext<ICircleSdkContext>({
  client: new CircleClient(),
});
