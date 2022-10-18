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
const products_1 = require("../models/products");
const Products = new products_1.ProductModel();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield Products.index();
        res.send(allProducts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productID = Number(req.params.id);
        const showProduct = yield Products.show(productID);
        res.send(showProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const selectCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = String(req.params.category);
        const selectOneCategory = yield Products.selectCategory(category);
        res.send(selectOneCategory);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category } = req.body;
        const product = { name, price, category };
        const newProduct = yield Products.create(product);
        res.send(newProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productID = Number(req.params.id);
        const delProduct = yield Products.deleteProduct(productID);
        res.send(delProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const products_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.get("/products/category/:category", selectCategory);
    app.post("/products/create", create);
    app.delete("/products/delete/:id", deleteProduct);
};
exports.default = products_routes;
