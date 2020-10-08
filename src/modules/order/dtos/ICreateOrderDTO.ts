export default interface ICreateOrderDTO {
  user_id: string;
  cart_id: string;
  status: string;
  total_price: number;
}
