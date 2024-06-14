"use strict";
/*********************************
 * Núcleo das rotas da API
 * a ser incluso na aplicação
 *********************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const substantivos_1 = require("./substantivos");
const router = express_1.default.Router();
exports.router = router;
router.use("/substantivos", substantivos_1.substantivos);
router.get('/', (req, res, next) => {
    res.send("API v0.0.1 substantivos e verbos somente leitura\n");
});
