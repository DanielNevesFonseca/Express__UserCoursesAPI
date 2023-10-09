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
const loadData_1 = require("../../configs/loadData");
const couses_mockes_1 = require("../../mocks/courses/couses.mockes");
describe("Testando rota de criação de curso", () => {
    let tokenAdmin;
    let tokenNotAdmin;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.connect();
        yield (0, configTestsDatabase_1.configureTestDatabase)(database_1.client);
        yield (0, loadData_1.createUsersData)(database_1.client);
        const token = yield (0, loadData_1.createTokenData)(database_1.client);
        tokenAdmin = token.tokenAdmin;
        tokenNotAdmin = token.tokenNotAdmin;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.end();
    }));
    it("POST /courses - Sucesso: Criando um curso com sucesso passando token de admin.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/courses")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .send(couses_mockes_1.createHTMLCourse);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
    }));
    it("POST /courses - Error: Criando um course com keys erradas no body da request.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/courses")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .send({ description: 1234 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
    }));
    it("POST /courses - Erro: Cadastrando curso com o token de não admin.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/courses")
            .set("Authorization", `Bearer ${tokenNotAdmin}`)
            .send(couses_mockes_1.createHTMLCourse);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Insufficient permission");
    }));
    it("POST /courses - Erro: Cadastrando curso sem enviar token.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/courses")
            .send(couses_mockes_1.createHTMLCourse);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Missing bearer token");
    }));
    it("POST /courses - Erro: Cadastrando curso enviando token errado.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/courses")
            .set("Authorization", `Bearer 1234`)
            .send(couses_mockes_1.createHTMLCourse);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
});
