// import models, express and verifyUser
import { Order, OrderModel } from "../models/orders";
import express, { Request, Response } from "express";
import { verifyUser } from "../helpers/jwtFun";

// create new orders models:
const Order = new OrderModel();

// index route: show all orders:
const index = async (req: Request, res: Response) => {
  try {
    // call orders method from models:
    const allOrders = await Order.index();
    // send the response to user:
    res.send(allOrders);
    // if there is an error:
  } catch (error) {
    // send error to the user:
    res.status(500).json(error);
  }
};
// Show route: show User orders:
const showUserOrder = async (req: Request, res: Response) => {
  try {
    // get ID
    const UserID = Number(req.params.id);
    const showUserOrders = await Order.showUserOrder(UserID);
    // send the response to user:
    res.send(showUserOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Show route: show all complets orders for a user:
const showUserCompletedOrders = async (req: Request, res: Response) => {
  try {
        // get ID
    const UserID = Number(req.params.id);
    const showUserCompletedOrders = await Order.showUserCompletedOrders(UserID);
        // send the response to user:
    res.send(showUserCompletedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Create route: create new orders:
const create = async (req: Request, res: Response) => {
  try {
    const { quantity, status, pro_id, user_id } = req.body;
    // verify token
    verifyUser(req);
    const order: Order = { quantity, status, pro_id, user_id };
    const newOrder = await Order.create(order);
        // send the response to user:
    res.send(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete route: delete orders:
const deleteOrder = async (req: Request, res: Response) => {
  try {
        // verify token
    verifyUser(req);
    const orderID = Number(req.params.id);
    const delOrder = await Order.deleteOrder(orderID);
        // send the response to user:
    res.send(delOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// available routes:
const orders_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", showUserOrder);
  app.get("/orders/completed/:id", showUserCompletedOrders);
  app.post("/orders/create", create);
  app.delete("/orders/delete/:id", deleteOrder);
};

export default orders_routes;
