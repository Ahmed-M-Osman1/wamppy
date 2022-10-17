import { User, UsersModel } from "../models/users";
import express, { Request, Response } from "express";
import { verifyUser, SignIn } from "../helpers/jwtFun";

const User = new UsersModel();

const index = async (req: Request, res: Response) => {
  try {
    const users = await User.index();
    verifyUser(req);
    res.send(users);
  } catch (error) {
    const e = error as Error;
    console.log(e);
    res.status(500).json(e.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.id);
    verifyUser(req, userID);
    const showUser = await User.show(userID);
    res.send(showUser);
  } catch (error) {
    const e = error as Error;
    if (
      e.message.includes(
        "user you ask for does not match with current user token - please provide a correct user ID"
      )
    ) {
      res.status(401).json(e.message);
    } else {
      res.status(500).json(e.message);
    }
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const userDate: User = { firstname, lastname, email, password };
    const newUser = await User.create(userDate);
    const token = SignIn(Number(newUser.id));
    res.send(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.id);
    const delUser = await User.deleteUser(userID);
    res.send(delUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const sign = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const signInUser = await User.login(email, password);
    if (signInUser === null) {
      res.status(401);
      res.json("Incorrect user information");
    } else {
      var token = SignIn(Number(signInUser.id));
      res
        .status(700)
        .json(`User successfully login and the token is : ${token}`);
    }
  } catch (error) {
    const e = error as Error;
    res.status(401).send(e.message);
  }
};

const users_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users/create", create);
  app.delete("/users/delete/:id", deleteUser);
  app.post("/users/login", sign);
};

export default users_routes;
