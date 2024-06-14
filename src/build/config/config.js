"use strict";
/*****************************
 * Configuração do express
 *****************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORTA = exports.app = void 0;
const express_1 = __importDefault(require("express"));
/*Outros middlewares como: cookie-parser, cookie-session ...
 https://expressjs.com/en/resources/middleware.html */
const app = (0, express_1.default)();
exports.app = app;
const PORTA = 8080;
exports.PORTA = PORTA;
//rotas
const index_1 = require("../routes/index");
app.use('/', index_1.router);
// tratamento de url do express
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
