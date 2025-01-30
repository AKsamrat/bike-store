"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    //setting default values
    let message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    //ultimate return
    res.status(statusCode).json({
        success: false,
        message,
        error: (err === null || err === void 0 ? void 0 : err.errors) || err,
        stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
