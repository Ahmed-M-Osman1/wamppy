import { Product, ProductModel } from "../../models/products";
const ProductsModel = new ProductModel();
const testProduct: Product = {
  name: "testItem",
  price: 1.000,
  category: "test",
};
let newProduct: Product;
describe("Testing ProductsModel: ", () => {
  it("Test the create methods", () => {
    expect(ProductsModel.create).toBeDefined();
  });
  it("Test the create methods with testProduct data", async () => {
    newProduct = await ProductsModel.create(testProduct);
    expect({
      name: newProduct.name,
      price: newProduct.price,
      category: newProduct.category,
    }).toEqual({
      name: testProduct.name,
      price: testProduct.price,
      category: testProduct.category,
    });
  });
  it("Test the index methods with testProduct data", () => {
    expect(ProductsModel.index).toBeDefined();
  });

  it("Test the index methods to include the testProduct", async () => {
    const allProducts = await ProductsModel.index();
    expect(allProducts).toContain(testProduct);
  });

  it("Test the show methods", () => {
    expect(ProductsModel.show).toBeDefined();
  });

  it("Test the show methods to return the testProduct", async () => {
    const ProductToSearch = await ProductsModel.show(testProduct.id as number);
    expect(ProductToSearch).toEqual(newProduct);
  });
  it("Test the delete method", () => {
    expect(ProductsModel.deleteProduct).toBeDefined();
  });

  it("Test the delete method to return the deleted Product", async () => {
    const deletedProduct = await ProductsModel.deleteProduct(
      newProduct.id as number
    );
    expect(deletedProduct.id).toEqual(newProduct.id);
  });
});
