"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWrongPasswordLogin = exports.userWrongEmailLogin = exports.userWrongKeysLogin = exports.userNotAdminLogin = exports.userAdminLogin = void 0;
const userAdminLogin = {
    email: 'ugo@kenzie.com.br',
    password: '1234',
};
exports.userAdminLogin = userAdminLogin;
const userNotAdminLogin = {
    email: 'lucas@kenzie.com.br',
    password: '1234',
};
exports.userNotAdminLogin = userNotAdminLogin;
const userWrongPasswordLogin = {
    email: 'lucas@kenzie.com.br',
    password: 'senhaerrada',
};
exports.userWrongPasswordLogin = userWrongPasswordLogin;
const userWrongEmailLogin = {
    email: 'emailerrado@email.com',
    password: '1234',
};
exports.userWrongEmailLogin = userWrongEmailLogin;
const userWrongKeysLogin = {
    email: 'emailerrado',
};
exports.userWrongKeysLogin = userWrongKeysLogin;
