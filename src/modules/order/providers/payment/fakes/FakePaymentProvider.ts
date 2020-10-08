import ICreateTransactionDTO from '../../dtos/ICreateTransactionsDTO';
import IPaymentProvider from '../models/IPaymentProvider';

export default class FakePaymentProvider implements IPaymentProvider {
  public async execute(_: ICreateTransactionDTO): Promise<'paid' | 'refused'> {
    return 'paid';
  }
}
