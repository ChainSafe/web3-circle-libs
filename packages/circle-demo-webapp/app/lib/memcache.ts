import { sdk } from '~/lib/sdk';
import { Token } from '~/lib/types';

class MemCache<ReturnType> {
  private map: Map<string, ReturnType>;
  private load: (id: string) => Promise<ReturnType>;

  constructor(options: { loadFunction: (id: string) => Promise<ReturnType> }) {
    this.load = options.loadFunction;
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
    const data = this.get(key);
    if (data) {
      return data;
    }
    const value = await this.load(key);
    this.set(key, value);
    return value;
  }
}

export const cachedCoins = new MemCache<Token>({
  loadFunction: async (id: string) => {
    const res = await sdk.getToken({ id });
    return res.data?.token as Token;
  },
});
