export default interface IHashProvider {
  create(payload: string): Promise<string>;
}
