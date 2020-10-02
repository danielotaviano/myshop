export default class AppError {
  public readonly message: string;
  public readonly status_code: number;
  constructor(message?: string, status_code?: number) {
    Object.assign(this, { message, status_code });
  }
}
