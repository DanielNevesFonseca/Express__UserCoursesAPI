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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const configTestsDatabase_1 = require("../../configs/configTestsDatabase");
const database_1 = require("../../../database");
const users_mocks_1 = require("../../mocks/users/users.mocks");
describe("Testando rota de criação de usuário", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.connect();
        yield (0, configTestsDatabase_1.configureTestDatabase)(database_1.client);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.end();
    }));
    it("POST /users - Sucesso: Criando um usuário admin com sucesso.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(users_mocks_1.createUserAdmin);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("admin");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.admin).toEqual(users_mocks_1.createUserAdmin.admin);
    }));
    it("POST /users - Sucesso: Criando um usuário não admin com sucesso.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(users_mocks_1.createUserNotAdmin);
        expect(response.status).toBe(201);
        expect(response.body).toMatch;
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("admin");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.admin).toEqual(users_mocks_1.createUserNotAdmin.admin);
    }));
    it("POST /users - Error: Criando um usuário com email que já existe.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(users_mocks_1.createUserNotAdmin);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Email already registered");
    }));
    it("POST /users - Error: Criando um usuário com keys erradas no body da request.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(users_mocks_1.createUserWrongKeys);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("password");
    }));
});
