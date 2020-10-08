import 'dotenv/config';
import pagarme from 'pagarme';
import checkoutConfig from '@config/checkout';

async function connect() {
  const client = await pagarme.client.connect({
    api_key: checkoutConfig.api_key,
  });

  const payment = await client.transactions.create({
    amount: 10000,
    card_number: '4111111111111111',
    card_holder_name: 'abc',
    card_expiration_date: '1225',
    card_cvv: '623',
    customer: {
      external_id: '#123456789',
      name: 'João das Neves',
      type: 'individual',
      country: 'br',
      email: 'joaoneves@norte.com',
      documents: [
        {
          type: 'cpf',
          number: '30621143049',
        },
      ],
      phone_numbers: ['+5511999999999', '+5511888888888'],
      birthday: '1985-01-01',
    },
    billing: {
      name: 'João das Neves',
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Vila Carrao',
        street: 'Rua Lobo',
        street_number: '999',
        zipcode: '03424030',
      },
    },
    shipping: {
      name: 'João das Neves',
      fee: 1000,
      delivery_date: '2017-12-25',
      expedited: true,
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Vila Carrao',
        street: 'Rua Lobo',
        street_number: '999',
        zipcode: '03424030',
      },
    },
    items: [
      {
        id: 'a123',
        title: 'Trono de Ferro',
        unit_price: 120000,
        quantity: 1,
        tangible: true,
      },
      {
        id: 'b123',
        title: 'Capa Negra de Inverno',
        unit_price: 30000,
        quantity: 1,
        tangible: true,
      },
    ],
  });
  console.log(payment);
}

connect();
