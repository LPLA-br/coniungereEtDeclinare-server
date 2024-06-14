"use strict";
/*************************************
* Controlador Repositório dos
* substantivos.
**************************************/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = __importStar(require("sqlite3"));
/**
* métodos controladores para resposta.
* */
class Substantivo {
    constructor(req, res) {
        this.httpRequest = req;
        this.httpResponse = res;
        this.httpResponse.setHeader('Access-Control-Allow-Origin', '*');
        this.sqlite = new sqlite3.Database('../databases/substantivos.db', (err) => {
            if (err != null) {
                throw new Error(err.message);
            }
        });
    }
    tratarTipoConsultaSql(resultadoConsultae) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof resultadoConsultae == "object") {
                this.httpResponse.send(JSON.stringify(resultadoConsultae));
            }
            else if (typeof resultadoConsultae == "string") {
                this.httpResponse.send(resultadoConsultae);
            }
            else {
                this.httpResponse.send('{"erro":"resultado da consulta intratável"}');
            }
        });
    }
    todosOsSubstantivos() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sqlite.all("SELECT * FROM substantivos", (err, linha) => {
                if (err)
                    throw err;
                else
                    this.tratarTipoConsultaSql(linha);
            });
        });
    }
    umSubstantivo() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const noms = (_a = this.httpRequest.query.noms) !== null && _a !== void 0 ? _a : undefined;
            if (typeof noms == "undefined")
                throw new Error("QUERY STRING INVÁLIDA: consulte o manual da api");
            else if (typeof noms != "string")
                throw new Error("QUERY STRING DE TIPO INVÁLIDO: consulte o manual da api");
            this.sqlite.get("SELECT * FROM substantivos WHERE nomS = ?", noms, (err, linha) => {
                if (err)
                    throw err;
                else
                    this.tratarTipoConsultaSql(linha);
            });
        });
    }
}
exports.default = Substantivo;
;
