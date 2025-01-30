"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
const http_status_codes_1 = require("http-status-codes");
const handlerDuplicateError = (err, res) => {
    res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
        status: false,
        statusCode: 409,
        message: err.errmsg,
        error: err,
        stack: err.stack,
    });
};
exports.handlerDuplicateError = handlerDuplicateError;
