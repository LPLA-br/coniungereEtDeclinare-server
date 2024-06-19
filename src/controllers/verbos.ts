/************************
 * controlador dos verbos
 *
 * Controlador deve jogar/throw
 * string JSON para roteador
 * emitir o erro http semântico.
 ************************/

import { Request, Response } from "express";
import * as sqlite3 from "sqlite3";

import { IFormatadorErro } from "../interfaces/FormatadorErro";

export default class Verbos
{

  protected sqlite: sqlite3.Database;
  protected httpRequest: Request;
  protected httpResponse: Response;
  protected formatadorErro: IFormatadorErro; //desacoplado
  protected consultas;

  constructor( req: Request, res: Response, formatadorErro: IFormatadorErro )
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

    this.consultas = {
      infinitivosAtivos: "SELECT id, praesens FROM infinitivos",
      indicativosAtivos: "SELECT pessoas.* FROM verbos INNER JOIN \
    ativa ON verbos.voz_ativa = ativa.id INNER JOIN \
    indicativos ON ativa.indicativo = indicativos.id INNER JOIN \
    pessoas ON indicativos.praesens = pessoas.id OR indicativos.imperfectum = pessoas.id OR \
    indicativos.futurum = pessoas.id OR indicativos.perfectum = pessoas.id OR \
    indicativos.plusquamperfectum = pessoas.id OR indicativos.futurumperfectum = pessoas.id \
    WHERE verbos.infinitivo = ?",
      subjuntivosAtivos: "SELECT pessoas.* FROM verbos INNER JOIN \
    ativa ON verbos.voz_ativa = ativa.id INNER JOIN \
    subjuntivos ON ativa.subjuntivo = subjuntivos.id INNER JOIN \
    pessoas ON subjuntivos.praesens = pessoas.id \
    OR subjuntivos.imperfectum = pessoas.id \
    OR subjuntivos.perfectum = pessoas.id \
    OR subjuntivos.plusquamperfectum = pessoas.id \
    WHERE verbos.infinitivo = ?",
      indicativosPassivos: "SELECT pessoas.* FROM verbos INNER JOIN \
    passiva ON verbos.voz_passiva = passiva.id INNER JOIN \
    indicativos ON passiva.indicativo = indicativos.id INNER JOIN \
    pessoas ON indicativos.praesens = pessoas.id OR \
    indicativos.imperfectum = pessoas.id OR \
    indicativos.futurum = pessoas.id OR \
    indicativos.perfectum = pessoas.id OR \
    indicativos.plusquamperfectum = pessoas.id OR \
    indicativos.futurumperfectum = pessoas.id \
    WHERE verbos.infinitivo = ?"
    };
  }

  // viola Single Responsibility (POG)
  /** Trata query string que exige infinitivo */
  protected tratarStringConsulta( query: any ): void
  {
    const { infinitivo } = query;
    
    if ( typeof infinitivo == "undefined" )
    {
      throw new Error( this.formatadorErro.obterStringJSONDoErro( 400, "bad request" ) );
    }
  }

  /** define qual verbo será usado na avaliação.
   *  /verbos/infinitivos
  * */
  public async obterInfinitivosAtivos(): Promise<void>
  {
    this.sqlite.all( this.consultas.infinitivosAtivos, (err, linhas)=>
    {
      if ( err )
      {
        this.formatadorErro.obterStringJSONDoErro( 500, err );
      }
      else this.httpResponse.status(200).send( linhas );
    });
  }

  /** retorna todos os tempos do modo indicativo da voz ativa
   *  para um verbo indicado.
  * /verbos/indicativoativo?infinitivo=amare */
  public async obterIndicativoAtivo(): Promise<void>
  {
    this.tratarStringConsulta( this.httpRequest.query );
    this.sqlite.all( this.consultas.indicativosAtivos,
                    this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  /** retorna todos os tempos do modo indicativo da voz ativa
   *  para um verbo indicado.
  *   /verbos/subjuntivoativo?infinitivo=amare */
  public async obterSubjuntivoAtivo(): Promise<void>
  {
    this.tratarStringConsulta( this.httpRequest.query );
    this.sqlite.all( this.consultas.subjuntivosAtivos,
                    this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterIndicativoPassivo(): Promise<void>
  {
    this.tratarStringConsulta( this.httpRequest.query );
    this.sqlite.all( this.consultas.indicativosPassivos,
                    this.httpRequest.query.infinitivo, (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterSubjuntivoPassivo(): Promise<void>
  {
  }
 
  public async obterImperativo(): Promise<void>
  {
  }

  public async obterParticipio(): Promise<void>
  {
  }

  public async obterGerundio(): Promise<void>
  {
  }

  public async obterGerundivo(): Promise<void>
  {
  }

}

