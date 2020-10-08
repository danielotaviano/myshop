import ICreateTransactionDTO from '../../dtos/ICreateTransactionsDTO';

export default interface IPaymentProvider {
  execute(data: ICreateTransactionDTO): Promise<'paid' | 'refused'>;
}
