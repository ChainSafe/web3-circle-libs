import { ElementsWalletSet } from '@chainsafe/react-elements';
import { Token } from '@circle-fin/developer-controlled-wallets';

import { sdk } from '~/lib/sdk';

class MemCache<ReturnType extends { id: string }> {
  private map: Map<string, ReturnType>;
  private load: ((id: string) => Promise<ReturnType>) | undefined;
  private loadAll: (() => Promise<ReturnType[]>) | undefined;

  constructor(options: {
    loadFunction?: (id: string) => Promise<ReturnType>;
    loadAllFunction?: () => Promise<ReturnType[]>;
  }) {
    this.load = options.loadFunction;
    this.loadAll = options.loadAllFunction;
    this.map = new Map<string, ReturnType>();
  }

  set(key: string, value: ReturnType): void {
    this.map.set(key, value);
  }

  get(key: string): ReturnType | undefined {
    return this.map.get(key);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  async loadAndSet(key: string): Promise<ReturnType> {
    if (typeof this.load !== 'function') {
      throw new Error('load function not defined');
    }
    const data = this.get(key);
    if (data) {
      return data;
    }
    const value = await this.load(key);
    this.set(key, value);
    return value;
  }

  async loadAllAndSet(): Promise<ReturnType[]> {
    if (typeof this.loadAll !== 'function') {
      throw new Error('loadAll function not defined');
    }
    const values = await this.loadAll();
    values.forEach((value) => {
      this.set(value.id, value);
    });
    return values;
  }

  invalidate() {
    this.map.clear();
  }
}

export const cachedCoins = new MemCache<Token>({
  loadFunction: async (id: string) => {
    const res = await sdk.getToken({ id });
    return res.data?.token as Token;
  },
});

export const cachedWalletSets = new MemCache<ElementsWalletSet>({
  loadAllFunction: async () => {
    const resp = await sdk.listWalletSets();
    return resp?.data?.walletSets as ElementsWalletSet[];
  },
});
