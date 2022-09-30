"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'Wamppy',
});
exports.default = client;
