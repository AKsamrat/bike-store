"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
/* eslint-disable prettier/prettier */
const jwt_decode_1 = require("jwt-decode");
const verifyToken = (token) => {
    return (0, jwt_decode_1.jwtDecode)(token);
};
exports.verifyToken = verifyToken;
