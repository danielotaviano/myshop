import ITokenProvider from '../model/ITokenProvider';

export default class FakeTokenProvider implements ITokenProvider {
  public async generate(user_id: string): Promise<string> {
    const token = user_id;

    return token;
  }
}
