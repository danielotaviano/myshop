import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import IHashProvider from '../model/IHashProvider';

@injectable()
export default class HashProvider implements IHashProvider {
  public async create(payload: string): Promise<string> {
    const hashed = await bcrypt.hash(payload, 8);
    return hashed;
  }

  public async compare(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash);
  }
}
