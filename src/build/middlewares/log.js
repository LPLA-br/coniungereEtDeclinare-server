"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = (req, res, next) => {
    console.log(`{"timestamp":${Date.now()},"ip":"${req.ip}","path":"${req.path}"},\n`);
    next();
};
exports.default = { log };
