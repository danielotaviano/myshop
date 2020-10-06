import ITokenProvider from '../model/ITokenProvider';
import authConfig from '@config/auth';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';

@injectable()
export default class TokenProvider implements ITokenProvider {
  public async generate(user_id: string): Promise<string> {
    const token = jwt.sign({ user_id }, authConfig.jwt_secret, {
      expiresIn: '1h',
    });

    return token;
  }
}
