import {Order, OrderModel} from "../models/orders";
import express, {Request, Response} from "express";
const Order = new OrderModel();

const index = async (req: Request, res: Response) => {
	try {
		const allOrders = await Order.index();
		res.send(allOrders);
	} catch (error) {
		res.status(500).json(error);
	}
};

const showUserOrder = async (req: Request, res: Response) => {
	try {
		const UserID = Number(req.params.id);
		const showUserOrders = await Order.showUserOrder(UserID);
		res.send(showUserOrders);
	} catch (error) {
		res.status(500).json(error);
	}
};

const showUserCompletedOrders = async (req: Request, res: Response) => {
	try {
		const UserID = Number(req.params.id);
		const showUserCompletedOrders = await Order.showUserCompletedOrders(UserID);
		res.send(showUserCompletedOrders);
	} catch (error) {
		console.log(error)
		res.status(500).json(error);
	}
};


const create = async (req: Request, res: Response) => {
	try {
		const {quantity, status, pro_id, user_id} = req.body;
		const order: Order = {quantity, status, pro_id, user_id};
		const newOrder = await Order.create(order);
		res.send(newOrder);
	} catch (error) {
		res.status(500).json(error);
	}
};

const deleteOrder = async (req: Request, res: Response) => {
	try {
		const orderID = Number(req.params.id);
		const delOrder = await Order.deleteOrder(orderID);
		res.send(delOrder);
	} catch (error) {
		res.status(500).json(error);
	}
};

const orders_routes = (app: express.Application) => {
	app.get("/orders", index);
	app.get("/orders/:id", showUserOrder);
	app.get("/orders/completed/:id", showUserCompletedOrders);
	app.post("/orders/create", create);
	app.delete("/orders/delete/:id", deleteOrder)
};

export default orders_routes;
