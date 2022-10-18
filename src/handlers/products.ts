import { Product, ProductModel } from "../models/products";
import express, { Request, Response } from "express";
import { verifyUser } from "../helpers/jwtFun";

const Products = new ProductModel();

const index = async (req: Request, res: Response) => {
  try {
    const allProducts = await Products.index();
    res.send(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const productID = Number(req.params.id);
    const showProduct = await Products.show(productID);
    res.send(showProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const selectCategory = async (req: Request, res: Response) => {
  try {
    const category = String(req.params.category);
    const selectOneCategory = await Products.selectCategory(category);
    res.send(selectOneCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    verifyUser(req)
    const { name, price, category } = req.body;
    const product: Product = { name, price, category };
    const newProduct = await Products.create(product);
    res.send(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    verifyUser(req)
    const productID = Number(req.params.id);
    const delProduct = await Products.deleteProduct(productID);
    res.send(delProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const products_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.get("/products/category/:category", selectCategory);
  app.post("/products/create", create);
  app.delete("/products/delete/:id", deleteProduct);
};

export default products_routes;
