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
const database_1 = require("../../../database");
const configTestsDatabase_1 = require("../../configs/configTestsDatabase");
const loadData_1 = require("../../configs/loadData");
describe('Testando rota de listagem de todos os cursos de usuário', () => {
    let tokenAdmin;
    let tokenNotAdmin;
    let userNotAdmin;
    let userAdmin;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.connect();
        yield (0, configTestsDatabase_1.configureTestDatabase)(database_1.client);
        const users = yield (0, loadData_1.createUsersData)(database_1.client);
        const token = yield (0, loadData_1.createTokenData)(database_1.client);
        yield (0, loadData_1.createCoursesData)(database_1.client);
        tokenAdmin = token.tokenAdmin;
        tokenNotAdmin = token.tokenNotAdmin;
        userAdmin = users.admin;
        userNotAdmin = users.notAdmin;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.client.end();
    }));
    it('GET /users/:id/courses - Sucesso: Listando cursos do usuário com token de admin.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/users/${userAdmin.id}/courses`)
            .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('courseId');
        expect(response.body[0]).toHaveProperty('courseName');
        expect(response.body[0]).toHaveProperty('courseDescription');
        expect(response.body[0]).toHaveProperty('userActiveInCourse');
        expect(response.body[0]).toHaveProperty('userId');
        expect(response.body[0]).toHaveProperty('userName');
    }));
    it('GET /users/:id/courses - Erro: Listando cursos do usuário com token de não admin.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/users/${userAdmin.id}/courses`)
            .set('Authorization', `Bearer ${tokenNotAdmin}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Insufficient permission');
    }));
    it('GET /users/:id/courses - Erro: Listandos todos os cursos sem enviar token.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/users/${userAdmin.id}/courses`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing bearer token');
    }));
    it('GET /users/:id/courses - Erro: Listandos todos os cursos enviando token errado.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/users/${userAdmin.id}/courses`)
            .set('Authorization', `Bearer 1234`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    }));
    it('GET /users/:id/courses - Erro: Listandos todos os cursos de um usuário que não tem cursos vinculados.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/users/${userNotAdmin.id}/courses`)
            .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('No course found');
    }));
});
