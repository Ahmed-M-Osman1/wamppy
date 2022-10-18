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
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    // index all orders model:
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can't load orders because of the following error: ${error}`);
            }
        });
    }
    // show User orders model:
    showUserOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id=($1)";
                const result = yield connection.query(sql, [user_id]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can't load this user orders because of the following error: ${error}`);
            }
        });
    }
    // show user completed orders model:
    showUserCompletedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='completed'";
                const result = yield connection.query(sql, [user_id]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can't show this user completed orders because of the following error: ${error}`);
            }
        });
    }
    // create orders model:
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "INSERT INTO orders (quantity,status, pro_id, user_id) VALUES ($1,$2,$3,$4) RETURNING *";
                const result = yield connection.query(sql, [
                    order.quantity,
                    order.status,
                    order.pro_id,
                    order.user_id,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't create this order because of the following error: ${error}`);
            }
        });
    }
    // delete product model:
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't delete order because of the following error: ${error}`);
            }
        });
    }
}
exports.OrderModel = OrderModel;
