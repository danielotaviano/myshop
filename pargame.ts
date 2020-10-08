import 'dotenv/config';
import pagarme from 'pagarme';
import checkoutConfig from '@config/checkout';

async function connect() {
  const client = await pagarme.client.connect({
    api_key: checkoutConfig.api_key,
  });

  const payment = await client.transactions.create();
  console.log(payment);
}

connect();
