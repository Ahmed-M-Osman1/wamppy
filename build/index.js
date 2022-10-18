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
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const port = 3001;
// use bodyparser to send req in urlencoded form.
app.use(express_1.default.json());
app.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to Wammpy. An Online storeFront using Node.js.");
}));
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
app.listen(port, () => {
    console.log(`app listen on ${port}`);
});
exports.default = app;
