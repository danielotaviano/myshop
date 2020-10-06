export default interface IHashProvider {
  create(payload: string): Promise<string>;
  compare(payload: string, hash: string): Promise<boolean>;
}
