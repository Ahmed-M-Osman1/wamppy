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
const users_1 = require("../../models/users");
const UserModel = new users_1.UsersModel();
const testUser = {
    firstname: "ahmed",
    lastname: "mamdouh",
    email: "ahmed@udacity.com",
    password: "password",
};
let newUser;
describe("Testing UsersModel: ", () => {
    it("Test the create methods", () => {
        expect(UserModel.create).toBeDefined();
    });
    it("Test the create methods with testUser data", () => __awaiter(void 0, void 0, void 0, function* () {
        newUser = yield UserModel.create(testUser);
        expect({
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
        }).toEqual({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
            email: testUser.email,
        });
    }));
    it("Test the index methods with testUser data", () => {
        expect(UserModel.index).toBeDefined();
    });
    it("Test the index methods to include the testUser", () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield UserModel.index();
        expect(allUsers).toContain(testUser);
    }));
    it("Test the show methods", () => {
        expect(UserModel.show).toBeDefined();
    });
    it("Test the show methods to return the testUser", () => __awaiter(void 0, void 0, void 0, function* () {
        const userToSearch = yield UserModel.show(testUser.id);
        expect(userToSearch).toEqual(newUser);
    }));
    it("Test the delete method", () => {
        expect(UserModel.deleteUser).toBeDefined();
    });
    it("Test the delete method to return the deleted user", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield UserModel.deleteUser(newUser.id);
        expect(deletedUser.id).toEqual(newUser.id);
    }));
});
