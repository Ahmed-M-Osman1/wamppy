import app from '../../index';
import { Order } from '../../models/orders';
import supertest from 'supertest';
import { User, UsersModel } from "../../models/users";
import { Product, ProductModel } from "../../models/products";
import { JwtPayload, verify } from 'jsonwebtoken';

const request = supertest(app);
describe('Test the orders endpoint /orders', () => {

  // the data of tested orders: 
  const testOrder: Order = {
    quantity: 2,
    status: "active",
    pro_id: 0,
    user_id: 0,
  };
  // secret form env file:
  const theSecretToken = process.env.TOKEN_SECRET as string;

  // safe some information outside the orders to test it:
  let OID: string;
  let UID: string;
  let UserToken: string;
// we should create product and user to test orders:
// create a user:
const UserModel = new UsersModel();
const testUser: User = {
  firstname: "ahmed",
  lastname: "mamdouh",
  email: "ahmed@udacity.com",
  password: "password",
};

// Create a product:
const ProductsModel = new ProductModel();
const testProduct: Product = {
  name: "testItem",
  price: 1.000,
  category: "test",
};

  beforeAll(async () => {
    const newUser = await UserModel.create(testUser);
    const newProduct = await ProductsModel.create(testProduct);
    if (newUser.id) testOrder.user_id = newUser.id;
    if (newProduct.id) testOrder.pro_id = newProduct.id;
    // create user to get the token:
    await request
    .post('/users/create')
    .send(testUser)
    .expect(200)
    .then((res) => {
      // the response is the token:
      UserToken = res.text;
       // verify it:
      const decodedJWT = verify(UserToken as string, theSecretToken) as JwtPayload;
      // get the user ID after decoded the token.
      UID = decodedJWT.data.UID;
    });

    });

  it('Test the create endpoint with testOrder data', async () => {
    await request
      .post('/orders/create')
      .set('Authorization', `Bearer ${UserToken}`)
      .send(testOrder)
      .expect(200)
      .then((res) => {
        // the response is the token:
        OID = res.body.id;
      });
  });
  // start the testing:
  it('Test the index endpoint to show all orders', async () => {
    await request
      .get('/orders')
      .expect(200);
  });

  it('Test the index endpoint to show specific orders', async () => {
    await request
      .get(`/orders/${OID}`)
      .set('Authorization', `Bearer ${UserToken}`)
      .expect(200);
  });


  it('Test the index endpoint to show all user orders', async () => {
    await request
      .get(`/orders/${testOrder.user_id}`)
      .expect(200);
  });


  it('Test the index endpoint to show all user completed orders', async () => {
    await request
      .get(`/orders/completed/${testOrder.user_id}`)
      .expect(200);
  });

  it('Test the delete endpoint with not correct orders ID', async () => {
    await request
      .get(`/orders/delete/${OID+1}`)
      .expect(404);
  });
});