import app from '../../index';
import { Product } from '../../models/products';
import supertest from 'supertest';

const request = supertest(app);
describe('Test the product endpoint /product', () => {

  // the data of tested product: 
  const testProduct: Product = {
    name: "testItem",
    price: 1.000,
    category: "test",
  };

  // safe some information outside the product to test it:
  let PID: string;
  
  it('Test the create endpoint with testProduct data', async () => {
    await request
      .post('/products/create')
      .send(testProduct)
      .expect(200)
      .then((res) => {
        // the response is the token:
        PID = res.body.id;
      });
  });
  // start the testing:
  it('Test the index endpoint to show all product', async () => {
    await request
      .get('/products')
      .expect(200);
  });

  it('Test the index endpoint to show specific product', async () => {
    await request
      .get(`/products/${PID}`)
      .expect(200);
  });


  it('Test the index endpoint to show specific category', async () => {
    await request
      .get(`/products/category/${testProduct.category}`)
      .expect(200);
  });

  it('Test the delete endpoint with not correct product ID', async () => {
    await request
      .get(`/products/delete/${PID+1}`)
      .expect(404);
  });
});