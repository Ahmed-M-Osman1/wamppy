import { Order, OrderModel } from "../../models/orders";
import { User, UsersModel } from "../../models/users";
import { Product, ProductModel } from "../../models/products";

// Create a user: 
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

const OrdersModel = new OrderModel();
const testOrder: Order = {
  quantity: 2,
  status: "active",
  pro_id: 0,
  user_id: 0,
};
let newOrder: Order;


describe("Testing OrdersModel: ", () => {
    beforeAll(async () => {
      const newUser = await UserModel.create(testUser);
      const newProduct = await ProductsModel.create(testProduct);
      if (newUser.id) testOrder.user_id = newUser.id;
      if (newProduct.id) testOrder.pro_id = newProduct.id;
      });
  it("Test the create methods", () => {
    expect(OrdersModel.create).toBeDefined();
  });
  it("Test the create methods with testOrder data", async () => {
    newOrder = await OrdersModel.create(testOrder);
    expect({
      quantity: newOrder.quantity,
      status: newOrder.status,
    }).toEqual({
      quantity: testOrder.quantity,
      status: testOrder.status,
    });
  });
  it("Test the index methods with testOrder data", () => {
    expect(OrdersModel.index).toBeDefined();
  });

  it("Test the index methods to include the testOrder", async () => {
    const allOrders = await OrdersModel.index();
    expect(allOrders).toContain(newOrder);
  });

  it("Test the show methods", () => {
    expect(OrdersModel.showUserOrder).toBeDefined();
  });
  it("Test the delete method", () => {
    expect(OrdersModel.deleteOrder).toBeDefined();
  });

  it("Test the delete method to return the deleted Order", async () => {
    const deletedOrder = await OrdersModel.deleteOrder(newOrder.id as number);
    expect(deletedOrder.id).toEqual(newOrder.id);
  });
});