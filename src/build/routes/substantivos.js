"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.substantivos = void 0;
const express_1 = require("express");
const substantivo_1 = __importDefault(require("../controllers/substantivo"));
const substantivos = (0, express_1.Router)();
exports.substantivos = substantivos;
substantivos.get("/", (req, res) => {
    try {
        const substantivo = new substantivo_1.default(req, res);
        if (Object.keys(req.query).length == 0)
            substantivo.todosOsSubstantivos();
        else
            substantivo.umSubstantivo();
    }
    catch (erro) {
        res.status(500).send(`{"erro":"${JSON.stringify(erro)}"}`);
    }
});
