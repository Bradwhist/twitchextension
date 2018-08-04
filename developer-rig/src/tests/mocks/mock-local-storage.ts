export class LocalStorage {
  constructor() {
    this.self = {};
  }

  private self: {
    [key: string]: string;
  };

  public getItem(key: string): string {
    if (!(key in this.self)) {
      return null;
    }
    return this.self[key];
  }

  public setItem(key: string, value: string) {
    this.self[key] = value;
  }
}
