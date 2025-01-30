"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleCastError = (err, res) => {
    res.status(400).json({
        success: false,
        message: err.message,
        // statusCode:err.statusCode,
        error: err,
        stack: err.stack,
    });
};
exports.handleCastError = handleCastError;
