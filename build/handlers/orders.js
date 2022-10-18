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
const orders_1 = require("../models/orders");
const Order = new orders_1.OrderModel();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield Order.index();
        res.send(allOrders);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const showUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserID = Number(req.params.id);
        const showUserOrders = yield Order.showUserOrder(UserID);
        res.send(showUserOrders);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const showUserCompletedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserID = Number(req.params.id);
        const showUserCompletedOrders = yield Order.showUserCompletedOrders(UserID);
        res.send(showUserCompletedOrders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quantity, status, pro_id, user_id } = req.body;
        const order = { quantity, status, pro_id, user_id };
        const newOrder = yield Order.create(order);
        res.send(newOrder);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderID = Number(req.params.id);
        const delOrder = yield Order.deleteOrder(orderID);
        res.send(delOrder);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const orders_routes = (app) => {
    app.get("/orders", index);
    app.get("/orders/:id", showUserOrder);
    app.get("/orders/completed/:id", showUserCompletedOrders);
    app.post("/orders/create", create);
    app.delete("/orders/delete/:id", deleteOrder);
};
exports.default = orders_routes;
