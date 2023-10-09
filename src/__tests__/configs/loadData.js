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
exports.createOnlyCoursesData = exports.createCoursesData = exports.createTokenData = exports.createUsersData = void 0;
const users_mocks_1 = require("../mocks/users/users.mocks");
const bcryptjs_1 = require("bcryptjs");
const pg_format_1 = __importDefault(require("pg-format"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const couses_mockes_1 = require("../mocks/courses/couses.mockes");
const createUsersData = (client) => __awaiter(void 0, void 0, void 0, function* () {
    users_mocks_1.createUserNotAdmin.password = yield (0, bcryptjs_1.hash)(users_mocks_1.createUserNotAdmin.password, 10);
    const queryResultNotAdmin = yield client.query((0, pg_format_1.default)(`
                INSERT INTO
                    "users"(%I)
                values
                    (%L)
                RETURNING *;
            `, Object.keys(users_mocks_1.createUserNotAdmin), Object.values(users_mocks_1.createUserNotAdmin)));
    users_mocks_1.createUserAdmin.password = yield (0, bcryptjs_1.hash)(users_mocks_1.createUserNotAdmin.password, 10);
    const queryResultAdmin = yield client.query((0, pg_format_1.default)(`
                INSERT INTO
                    "users"(%I)
                values
                    (%L)
                RETURNING *;
            `, Object.keys(users_mocks_1.createUserAdmin), Object.values(users_mocks_1.createUserAdmin)));
    return {
        admin: queryResultAdmin.rows[0],
        notAdmin: queryResultNotAdmin.rows[0],
    };
});
exports.createUsersData = createUsersData;
const createCoursesData = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResultHTML = yield client.query((0, pg_format_1.default)(`
                INSERT INTO
                    "courses"(%I)
                values
                    (%L)
                RETURNING *;
            `, Object.keys(couses_mockes_1.createHTMLCourse), Object.values(couses_mockes_1.createHTMLCourse)));
    const queryResultNode = yield client.query((0, pg_format_1.default)(`
                INSERT INTO
                    "courses"(%I)
                values
                    (%L)
                RETURNING *;
            `, Object.keys(couses_mockes_1.createNodeCourse), Object.values(couses_mockes_1.createNodeCourse)));
    yield client.query(`
        INSERT INTO
            "userCourses"("active", "userId", "courseId")
        VALUES
            (true, (SELECT id FROM "users" WHERE email = 'ugo@kenzie.com.br'), $1),
            (true, (SELECT id FROM "users" WHERE email = 'ugo@kenzie.com.br'), $2);
        `, [queryResultHTML.rows[0].id, queryResultNode.rows[0].id]);
    return {
        HTMLCourse: queryResultHTML.rows[0],
        nodeCourse: queryResultNode.rows[0],
    };
});
exports.createCoursesData = createCoursesData;
const createOnlyCoursesData = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResultHTML = yield client.query((0, pg_format_1.default)(`
                INSERT INTO
                    "courses"(%I)
                values
                    (%L)
                RETURNING *;
            `, Object.keys(couses_mockes_1.createHTMLCourse), Object.values(couses_mockes_1.createHTMLCourse)));
    const queryResultNode = yield client.query((0, pg_format_1.default)(`
                INSERT INTO
                    "courses"(%I)
                values
                    (%L)
                RETURNING *;
            `, Object.keys(couses_mockes_1.createNodeCourse), Object.values(couses_mockes_1.createNodeCourse)));
    return {
        HTMLCourse: queryResultHTML.rows[0],
        nodeCourse: queryResultNode.rows[0],
    };
});
exports.createOnlyCoursesData = createOnlyCoursesData;
const createTokenData = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const userAdminData = yield client.query(`
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `, [users_mocks_1.createUserAdmin.email]);
    const tokenAdmin = jsonwebtoken_1.default.sign({
        email: users_mocks_1.createUserAdmin.email,
        admin: users_mocks_1.createUserAdmin.admin,
    }, process.env.SECRET_KEY, {
        subject: String(userAdminData.rows[0].id),
    });
    const userNotAdminData = yield client.query(`
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `, [users_mocks_1.createUserNotAdmin.email]);
    const tokenNotAdmin = jsonwebtoken_1.default.sign({
        email: users_mocks_1.createUserNotAdmin.email,
        admin: users_mocks_1.createUserNotAdmin.admin,
    }, process.env.SECRET_KEY, {
        subject: String(userNotAdminData.rows[0].id),
    });
    return {
        tokenAdmin,
        tokenNotAdmin,
    };
});
exports.createTokenData = createTokenData;
