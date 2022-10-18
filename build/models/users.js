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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { PEPPER, SALT_ROUNDS } = process.env;
class UsersModel {
    // index all users model:
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM users";
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can't load users because of the following error: ${error}`);
            }
        });
    }
    // show one user model:
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE id=($1)";
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't load this user because of the following error: ${error}`);
            }
        });
    }
    // create user model:
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "INSERT INTO users (firstname,lastname,email, password) VALUES ($1,$2,$3, $4) RETURNING *";
                const hashPassword = bcrypt_1.default.hashSync(user.password + PEPPER, Number(SALT_ROUNDS));
                const result = yield connection.query(sql, [
                    user.firstname,
                    user.lastname,
                    user.email,
                    hashPassword,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't create user because of the following error: ${error}`);
            }
        });
    }
    // update user model:
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "UPDATE user SET firstName=($1) lastName=($2) WHERE id=($3) RETURNING *";
                const result = yield connection.query(sql, [
                    user.firstname,
                    user.lastname,
                    user.id,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't update user because of the following error: ${error}`);
            }
        });
    }
    // delete user model:
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can't update user because of the following error: ${error}`);
            }
        });
    }
    // login user using email and password
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE email=($1)";
                const result = yield conn.query(sql, [email]);
                const user = result.rows[0];
                if (user) {
                    if (bcrypt_1.default.compareSync(password + PEPPER, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(`Failed to sign in with this user because of the following error: ${error}`);
            }
        });
    }
}
exports.UsersModel = UsersModel;
