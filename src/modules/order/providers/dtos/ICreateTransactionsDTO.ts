export default interface ICreateTransactionDTO {
  amount: number;
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
  customer: {
    external_id: string;
    name: string;
    type: string;
    country: string;
    email: string;
    documents: [
      {
        type: string;
        number: string;
      },
    ];
    phone_numbers: string[];
    birthday: string;
  };
  billing: {
    name: string;
    address: {
      country: string;
      state: string;
      city: string;
      neighborhood: string;
      street: string;
      street_number: string;
      zipcode: string;
    };
  };
  shipping?: {
    name: string;
    fee: number;
    delivery_date: string;
    expedited: boolean;
    address: {
      country: string;
      state: string;
      city: string;
      neighborhood: string;
      street: string;
      street_number: string;
      zipcode: string;
    };
  };
  items: [
    {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      tangible: boolean;
    },
    {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      tangible: boolean;
    },
  ];
}
