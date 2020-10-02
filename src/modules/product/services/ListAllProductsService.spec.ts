import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';
import ListAllProductsService from './ListAllProductsService';

describe('List all Products', () => {
  let fakeProductRepository: FakeProductRepository;
  let createProduct: CreateProductService;
  let listAllProductsService: ListAllProductsService;
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    listAllProductsService = new ListAllProductsService(fakeProductRepository);
    createProduct = new CreateProductService(fakeProductRepository);
  });
  it('should be able to list all registred products', async () => {
    const product1 = await createProduct.execute({
      name: 'Bike',
      description: 'a bike',
      quantity: 10,
      photo_url: '',
      price: 19.9,
    });

    const product2 = await createProduct.execute({
      name: 'book',
      description: 'a book',
      quantity: 0,
      photo_url: '',
      price: 19.9,
    });

    const products = await listAllProductsService.execute();
    console.log(products);

    expect(products).toEqual([product1, product2]);
  });
});
