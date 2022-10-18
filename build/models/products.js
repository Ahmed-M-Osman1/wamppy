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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    // index all product model:
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM products";
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can't load product because of the following error: ${error}`);
            }
        });
    }
    // show one product model:
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM products WHERE id=($1)";
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't load this product because of the following error: ${error}`);
            }
        });
    }
    // select category for product model:
    selectCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM products WHERE category=($1)";
                const result = yield connection.query(sql, [category]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can't select this categoty because of the following error: ${error}`);
            }
        });
    }
    // create product model:
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "INSERT INTO products (name, price, category) VALUES ($1,$2,$3) RETURNING *";
                const result = yield connection.query(sql, [
                    product.name,
                    product.price,
                    product.category,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't create product because of the following error: ${error}`);
            }
        });
    }
    // update product model:
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "UPDATE products SET name=($1) price=($2) category=($3) WHERE id=($4) RETURNING *";
                const result = yield connection.query(sql, [
                    product.name,
                    product.price,
                    product.category,
                    product.id,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't update product because of the following error: ${error}`);
            }
        });
    }
    // delete product model:
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't delete product because of the following error: ${error}`);
            }
        });
    }
}
exports.ProductModel = ProductModel;
