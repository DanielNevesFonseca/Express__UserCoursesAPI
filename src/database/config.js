"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const config = () => {
    if (process.env.NODE_ENV === "test") {
        return {
            user: process.env.DB_TEST_USER,
            password: process.env.DB_TEST_PASSWORD,
            host: process.env.DB_TEST_HOST,
            database: process.env.DB_TEST,
            port: parseInt(process.env.DB_TEST_PORT),
        };
    }
    return {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB,
        port: parseInt(process.env.DB_PORT),
    };
};
const client = new pg_1.Client(config());
exports.default = client;
