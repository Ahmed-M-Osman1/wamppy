import {User, UsersModel} from "../models/users";
import express, {Request, Response} from "express";
const User = new UsersModel();

const index = async (req: Request, res: Response) => {
	try {
		const users = await User.index();
		res.send(users);
	} catch (error) {
		res.status(500).json(error);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const userID = Number(req.params.id);
		const showUser = await User.show(userID);
		res.send(showUser);
	} catch (error) {
		res.status(500).json(error);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const {firstName, lastName, password} = req.body;
		const user: User = {firstName, lastName, password};
		const newUser = await User.create(user);
		res.send(newUser);
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


const users_routes = (app: express.Application) => {
	app.get("/users", index);
	app.get("/users/:id", show);
	app.post("/users/create", create);
	app.delete("/users/delete/:id", deleteUser);
};

export default users_routes;
