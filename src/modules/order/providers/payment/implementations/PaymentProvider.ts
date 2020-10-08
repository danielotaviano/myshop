import pagarme from 'pagarme';
import checkoutConfig from '@config/checkout';
import IPaymentProvider from '../models/IPaymentProvider';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionsDTO';

export default class PaymentProvider implements IPaymentProvider {
  private client;
  constructor() {
    this.client = pagarme.client();
  }

  public async execute(
    paymentInfo: ICreateTransactionDTO,
  ): Promise<'paid' | 'refused'> {
    const connectClient = this.client.connect({
      api_key: checkoutConfig.api_key,
    });

    const payment = connectClient.transaction.create(paymentInfo);

    return payment.status;
  }
}
