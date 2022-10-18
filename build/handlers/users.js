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
const users_1 = require("../models/users");
const jwtFun_1 = require("../helpers/jwtFun");
const User = new users_1.UsersModel();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.index();
        (0, jwtFun_1.verifyUser)(req);
        res.send(users);
    }
    catch (error) {
        const e = error;
        console.log(e);
        res.status(500).json(e.message);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = Number(req.params.id);
        (0, jwtFun_1.verifyUser)(req, userID);
        const showUser = yield User.show(userID);
        res.send(showUser);
    }
    catch (error) {
        const e = error;
        if (e.message.includes("user you ask for does not match with current user token - please provide a correct user ID")) {
            res.status(500).json(e.message);
        }
        else {
            res.status(401).json(e.message);
        }
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userDate = { firstname, lastname, email, password };
        const newUser = yield User.create(userDate);
        const token = (0, jwtFun_1.SignIn)(Number(newUser.id));
        res.send(token);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = Number(req.params.id);
        const delUser = yield User.deleteUser(userID);
        res.send(delUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const sign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const signInUser = yield User.login(email, password);
        if (signInUser === null) {
            res.status(401);
            res.json("Incorrect user information");
        }
        else {
            var token = (0, jwtFun_1.SignIn)(Number(signInUser.id));
            res
                .status(700)
                .json(`User successfully login and the token is : ${token}`);
        }
    }
    catch (error) {
        const e = error;
        res.status(401).send(e.message);
    }
});
const users_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users/create", create);
    app.delete("/users/delete/:id", deleteUser);
    app.post("/users/login", sign);
};
exports.default = users_routes;
