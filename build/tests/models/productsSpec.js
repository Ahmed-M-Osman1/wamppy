"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
const ProductsModel = new products_1.ProductModel();
const testProduct = {
    name: "testItem",
    price: 1.0,
    category: "test",
};
let newProduct;
describe("Testing ProductsModel: ", () => {
    it("Test the create methods", () => {
        expect(ProductsModel.create).toBeDefined();
    });
    it("Test the create methods with testProduct data", () => __awaiter(void 0, void 0, void 0, function* () {
        newProduct = yield ProductsModel.create(testProduct);
        expect({
            name: newProduct.name,
            price: newProduct.price,
            category: newProduct.category,
        }).toEqual({
            name: testProduct.name,
            price: testProduct.price,
            category: testProduct.category,
        });
    }));
    it("Test the index methods with testProduct data", () => {
        expect(ProductsModel.index).toBeDefined();
    });
    it("Test the index methods to include the testProduct", () => __awaiter(void 0, void 0, void 0, function* () {
        const allProducts = yield ProductsModel.index();
        expect(allProducts).toContain(testProduct);
    }));
    it("Test the show methods", () => {
        expect(ProductsModel.show).toBeDefined();
    });
    it("Test the show methods to return the testProduct", () => __awaiter(void 0, void 0, void 0, function* () {
        const ProductToSearch = yield ProductsModel.show(testProduct.id);
        expect(ProductToSearch).toEqual(newProduct);
    }));
    it("Test the delete method", () => {
        expect(ProductsModel.deleteProduct).toBeDefined();
    });
    it("Test the delete method to return the deleted Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedProduct = yield ProductsModel.deleteProduct(newProduct.id);
        expect(deletedProduct.id).toEqual(newProduct.id);
    }));
});
