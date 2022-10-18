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
const orders_1 = require("../../models/orders");
const OrdersModel = new orders_1.OrderModel();
const testOrder = {
    quantity: 2,
    status: "active",
    pro_id: 0,
    user_id: 0,
};
let newOrder;
describe("Testing OrdersModel: ", () => {
    // beforeAll(async () => {
    //   const lead = await OrdersModel.create({
    //     name: 'C-3PO',
    //     email: 'C@3PO.com',
    //     password: 'beep-boop',
    //   });
    // });
    it("Test the create methods", () => {
        expect(OrdersModel.create).toBeDefined();
    });
    it("Test the create methods with testOrder data", () => __awaiter(void 0, void 0, void 0, function* () {
        newOrder = yield OrdersModel.create(testOrder);
        expect({
            quantity: newOrder.quantity,
            status: newOrder.status,
        }).toEqual({
            quantity: testOrder.quantity,
            status: testOrder.status,
        });
    }));
    it("Test the index methods with testOrder data", () => {
        expect(OrdersModel.index).toBeDefined();
    });
    it("Test the index methods to include the testOrder", () => __awaiter(void 0, void 0, void 0, function* () {
        const allOrders = yield OrdersModel.index();
        expect(allOrders).toContain(testOrder);
    }));
    it("Test the show methods", () => {
        expect(OrdersModel.showUserOrder).toBeDefined();
    });
    it("Test the delete method", () => {
        expect(OrdersModel.deleteOrder).toBeDefined();
    });
    it("Test the delete method to return the deleted Order", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedOrder = yield OrdersModel.deleteOrder(newOrder.id);
        expect(deletedOrder.id).toEqual(newOrder.id);
    }));
});
