import pagarme from 'pagarme';
import checkoutConfig from '@config/checkout';
import IPaymentProvider from '../models/IPaymentProvider';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionsDTO';
import { injectable } from 'inversify';
@injectable()
export default class PaymentProvider implements IPaymentProvider {
  private client;
  constructor() {
    this.client = pagarme.client.connect({
      api_key: checkoutConfig.api_key,
    });
  }

  public async execute(
    paymentInfo: ICreateTransactionDTO,
  ): Promise<'paid' | 'refused'> {
    const payment = await (await this.client).transactions.create(paymentInfo);
    return payment.status;
  }
}
