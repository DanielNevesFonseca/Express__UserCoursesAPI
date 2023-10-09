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
exports.configureTestDatabase = void 0;
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const deleteTables = (database) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        DROP TABLE IF EXISTS
            "users",
            "courses",
            "userCourses"
        CASCADE;
    `;
    yield database.query(query).catch((err) => console.error({
        message: `Aconteceu um erro ${err.code}. Verifique se o nome da sua tabela e as colunas estão de acordo com o solicitado na descrição da entrega.`,
        error: err.message,
    }));
});
const createTables = (database) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = fs_1.default.readFileSync("sql/createTables.sql").toString();
    yield database.query(sql).catch((err) => console.error({
        message: `Aconteceu um erro ${err.code}. Verifique se as querys de criação das tabelas em 'sql/createTables.sql' estão funcionais. E se o nome da sua tabela e colunas estão de acordo com o solicitado na descrição da entrega`,
        error: err.message,
    }));
});
const configureTestDatabase = (database) => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteTables(database);
    yield createTables(database);
});
exports.configureTestDatabase = configureTestDatabase;
