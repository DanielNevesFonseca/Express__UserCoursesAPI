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
const login_mocks_1 = require("../../mocks/login/login.mocks");
const loadData_1 = require("../../configs/loadData");
describe("Testando rota de login", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.connect();
        yield (0, configTestsDatabase_1.configureTestDatabase)(database_1.client);
        yield (0, loadData_1.createUsersData)(database_1.client);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.end();
    }));
    it("POST /login - Sucesso: Fazendo login com usuário ativo.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(login_mocks_1.userNotAdminLogin);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
    it("POST /login - Error: Fazendo login com senha incorreta.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(login_mocks_1.userWrongPasswordLogin);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Wrong email/password");
    }));
    it("POST /login - Error: Fazendo login com email incorreto.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(login_mocks_1.userWrongEmailLogin);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Wrong email/password");
    }));
    it("POST /login - Error: Fazendo login com keys incorretas.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(login_mocks_1.userWrongKeysLogin);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("password");
    }));
});
