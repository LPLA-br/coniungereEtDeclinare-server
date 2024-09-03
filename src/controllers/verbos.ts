/************************
 * controlador dos verbos
 *
 * Controlador deve jogar/throw
 * string JSON para roteador
 * emitir o erro http semântico.
 * 200 OK
 * 404 NOT_FOUND
 * 400 BAD_REQUEST
 * 500 INTERNAL_SERVER_ERROR
 ************************/

import { Request, Response } from "express";
import * as sqlite3 from "sqlite3";

import { IFormatadorErro } from "../interfaces/FormatadorErro";
import ITratadorConsulta from "../interfaces/TratadorConsulta";

import { consultas } from "../types/consultas";

export default class Verbos
{

  protected sqlite: sqlite3.Database;
  protected httpRequest: Request;
  protected httpResponse: Response;
  protected formatadorErro: IFormatadorErro;
  protected tratadorConsulta: ITratadorConsulta;
  protected consultas;

  constructor( req: Request, res: Response,
              tratadorConsulta: ITratadorConsulta, formatadorErro: IFormatadorErro )
  {
    this.httpRequest  = req;
    this.httpResponse = res;
    this.httpResponse.setHeader( 'Access-Control-Allow-Origin', '*' );

    this.sqlite = new sqlite3.Database( '../databases/verbos.db', (err)=>
    {
      if ( err != null )
      {
        throw new Error( err.message );
      }
    });
    this.formatadorErro = formatadorErro;
    this.tratadorConsulta = tratadorConsulta;

    this.consultas =
    {
      indicativoAtivoPresente:        "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN indicativos ON ativa.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.praesens = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoAtivoImperfeito:      "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN indicativos ON ativa.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.imperfectum       = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoAtivoPerfeito:        "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN indicativos ON ativa.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.perfectum           = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoAtivoMaisQuePerfeito: "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN indicativos ON ativa.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.plusquamperfectum         = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoAtivoFuturoPerfeito:  "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN indicativos ON ativa.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.futurumperfectum = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoAtivoFuturo:          "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN indicativos ON ativa.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.futurum  = pessoas.id WHERE verbos.infinitivo = ?;",

      subjuntivoAtivoPresente:        "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN subjuntivos ON ativa.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.praesens = pessoas.id WHERE verbos.infinitivo = ?",
      subjuntivoAtivoImperfeito:      "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN subjuntivos ON ativa.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.imperfectum = pessoas.id WHERE verbos.infinitivo = ?",
      subjuntivoAtivoPerfeito:        "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN subjuntivos ON ativa.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id WHERE verbos.infinitivo = ?",
      subjuntivoAtivoMaisQuePerfeito: "SELECT pessoas.* FROM verbos INNER JOIN ativa ON verbos.voz_ativa = ativa.id INNER JOIN subjuntivos ON ativa.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.plusquamperfectum = pessoas.id WHERE verbos.infinitivo = ?",
     
      indicativoPassivoPresente:        "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN indicativos ON passiva.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.praesens = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoPassivoImperfeito:      "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN indicativos ON passiva.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.imperfectum = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoPassivoPerfeito:        "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN indicativos ON passiva.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.perfectum = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoPassivoMaisQuePerfeito: "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN indicativos ON passiva.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.plusquamperfectum = pessoas.id WHERE verbos.infinitivo = ?;",
      indicativoPassivoFuturoPerfeito:  "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN indicativos ON passiva.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.futurumperfectum = pessoas.id WHERE verbos.infinitivo = ?;" ,
      indicativoPassivoFuturo:          "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN indicativos ON passiva.indicativo = indicativos.id INNER JOIN pessoas ON indicativos.futurum = pessoas.id WHERE verbos.infinitivo = ?;",

      subjuntivoPassivoPresente:        "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN subjuntivos ON passiva.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.praesens = pessoas.id WHERE verbos.infinitivo = ?",
      subjuntivoPassivoImperfeito:      "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN subjuntivos ON passiva.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.imperfectum = pessoas.id WHERE verbos.infinitivo = ?",
      subjuntivoPassivoPerfeito:        "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN subjuntivos ON passiva.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id WHERE verbos.infinitivo = ?",
      subjuntivoPassivoMaisQuePerfeito: "SELECT pessoas.* FROM verbos INNER JOIN passiva ON verbos.voz_passiva = passiva.id INNER JOIN subjuntivos ON passiva.subjuntivo = subjuntivos.id INNER JOIN pessoas ON subjuntivos.praesens = pessoas.id OR subjuntivos.imperfectum = pessoas.id OR subjuntivos.perfectum = pessoas.id OR subjuntivos.plusquamperfectum = pessoas.id WHERE verbos.infinitivo = ?",

      infinitivosAtivos: "SELECT id, praesens, voz FROM infinitivos",
      imperativos: "SELECT imperativos.* FROM verbos INNER JOIN ativa ON ativa.id = verbos.voz_ativa INNER JOIN imperativos ON imperativos.id = ativa.imperativo WHERE verbos.infinitivo = ?",
      infinitivos: "SELECT infinitivos.* FROM verbos INNER JOIN ativa ON ativa.id = verbos.voz_ativa INNER JOIN infinitivos ON infinitivos.id = ativa.infinitivo WHERE verbos.infinitivo = ?",
      participios: "SELECT participios.* FROM verbos INNER JOIN ativa ON ativa.id = verbos.voz_ativa INNER JOIN participios ON participios.id = ativa.participio WHERE verbos.infinitivo = ?",
      gerundios: "SELECT gerundios.* FROM verbos INNER JOIN ativa ON ativa.id = verbos.voz_ativa INNER JOIN gerundios ON gerundios.id = ativa.gerundio WHERE verbos.infinitivo = ?",
      gerundivos: "SELECT gerundivos.* FROM verbos INNER JOIN passiva ON passiva.id = verbos.voz_passiva INNER JOIN gerundivos ON gerundivos.id = passiva.gerundivo WHERE verbos.infinitivo = ?"
    }; 
  }

  public async obterTempoVerbalPorRegistroDeConsultas( modoVozTempo: consultas ): Promise<void>
  {
    this.sqlite.all( this.consultas[modoVozTempo], this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err ) );
      else this.tratadorConsulta.tratarTipoConsultaSql( linhas );
    });
  }

  public async obterInfinitivosAtivos(): Promise<void>
  {
    this.sqlite.all( this.consultas.infinitivosAtivos, (err, linhas)=>
    {
      if ( err )
      {
        this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err ) );
      }
      else this.tratadorConsulta.tratarTipoConsultaSql( linhas );
    });
  }

  public async obterImperativo(): Promise<void>
  {
    this.sqlite.all( this.consultas.imperativos,
                    this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err ) );
      else this.tratadorConsulta.tratarTipoConsultaSql( linhas );
    });
  }

  public async obterParticipio(): Promise<void>
  {
    this.sqlite.all( this.consultas.participios,
                    this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err ) );
      else this.tratadorConsulta.tratarTipoConsultaSql( linhas );
    });
  }

  public async obterGerundio(): Promise<void>
  {
    this.sqlite.all( this.consultas.gerundios,
                    this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err ) );
      else this.tratadorConsulta.tratarTipoConsultaSql( linhas );
    });
  }

  public async obterGerundivo(): Promise<void>
  {
    this.sqlite.all( this.consultas.gerundivos,
                    this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err ) );
      else this.tratadorConsulta.tratarTipoConsultaSql( linhas );
    });
  }
};

