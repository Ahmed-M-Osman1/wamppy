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
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const port = 3001;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.connect(); // Create a new connection to the database
    const query = 'SELECT * FROM students'; // Create a query to select all students
    const results = yield connection.query(query); // Execute the query
    connection.release(); // Release the connection
    res.send(results.rows); // Send the results
}));
app.listen(port, () => {
    console.log(`app listen on ${port}`);
});
