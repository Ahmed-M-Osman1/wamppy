// import models, express and verifyUser
import { Product, ProductModel } from "../models/products";
import express, { Request, Response } from "express";
import { verifyUser } from "../helpers/jwtFun";
// create new Product models:
const Products = new ProductModel();
// index route: show all products:
const index = async (req: Request, res: Response) => {
  try {
        // call product index method from models:
    const allProducts = await Products.index();
        // send the response to user:
    res.send(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Show route: show a product:
const show = async (req: Request, res: Response) => {
  try {
        // get ID
    const productID = Number(req.params.id);
    const showProduct = await Products.show(productID);
        // send the response to user:
    res.send(showProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Show route: show all product for a category:
const selectCategory = async (req: Request, res: Response) => {
  try {
            // get ID
    const category = String(req.params.category);
    const selectOneCategory = await Products.selectCategory(category);
            // send the response to user:
    res.send(selectOneCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Create route: create new product:
const create = async (req: Request, res: Response) => {
  try {
        // verify token
    verifyUser(req)
    const { name, price, category } = req.body;
    const product: Product = { name, price, category };
    const newProduct = await Products.create(product);
            // send the response to user:
    res.send(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete route: delete orders:
const deleteProduct = async (req: Request, res: Response) => {
  try {
            // verify token
    verifyUser(req)
    const productID = Number(req.params.id);
    const delProduct = await Products.deleteProduct(productID);
            // send the response to user:
    res.send(delProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// available routes:
const products_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.get("/products/category/:category", selectCategory);
  app.post("/products/create", create);
  app.delete("/products/delete/:id", deleteProduct);
};

export default products_routes;
