"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWrongKeys = exports.createUserNotAdmin = exports.createUserAdmin = void 0;
const createUserAdmin = {
    name: 'Ugo',
    email: 'ugo@kenzie.com.br',
    password: '1234',
    admin: true,
};
exports.createUserAdmin = createUserAdmin;
const createUserNotAdmin = {
    name: 'Lucas',
    email: 'lucas@kenzie.com.br',
    password: '1234',
    admin: false,
};
exports.createUserNotAdmin = createUserNotAdmin;
const createUserWrongKeys = {
    name: 1234,
    email: 'joaoerrado',
};
exports.createUserWrongKeys = createUserWrongKeys;
