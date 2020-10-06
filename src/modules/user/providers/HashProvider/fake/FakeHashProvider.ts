import IHashProvider from '../model/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async create(payload: string): Promise<string> {
    return payload;
  }

  public async compare(payload: string, hash: string): Promise<boolean> {
    return payload === hash;
  }
}
