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

  public sqlite: sqlite3.Database;
  public httpRequest: Request;
  public httpResponse: Response;
  public formatadorErro: IFormatadorErro; //desacoplado

  constructor( req: Request, res: Response, formatadorErro: IFormatadorErro )
  {
    this.httpRequest  = req;
    this.httpResponse = res;
    this.httpResponse.setHeader( 'Access-Control-Allow-Origin', '*' );

    this.sqlite = new sqlite3.Database( '../databases/substantivos.db', (err)=>
    {
      if ( err != null )
      {
        throw new Error( err.message );
      }
    });
    this.formatadorErro = formatadorErro;
  }

  /** define qual verbo será usado na avaliação.
   * retorna infinitivosPresentes e seus id's
  * */
  public async obterInfinitivosAtivos(): Promise<void>
  {
    const consulta = "SELECT id, praesens FROM infinitivos WHERE voz = 'a'";

    this.sqlite.all(consulta, (err, linhas)=>
    {
      if ( err )
      {
        this.formatadorErro.obterStringJSONDoErro( 500, err );
      }
      else this.httpResponse.status(200).send( linhas );
    });
  }

  public async obterIndicativosAtivos(): Promise<void>
  {
    const {idInfinitivo} = this.httpRequest.query;
    const consulta = "SELECT ";

    if ( typeof idInfinitivo == "undefined" )
    {
      throw new Error( this.formatadorErro.obterStringJSONDoErro( 400, "bad request" ) );
    }

    this.sqlite.all(consulta, (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterSubjuntivoPassivo(): Promise<void>
  {
    this.sqlite.all('SELECT praesens FROM infinitivos', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterIndicativoPassivo(): Promise<void>
  {
    this.sqlite.all('SELECT praesens FROM infinitivos', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterSubjuntivoAtivo(): Promise<void>
  {
    this.sqlite.all('SELECT praesens FROM infinitivos', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }
 
  public async obterImperativo(): Promise<void>
  {
    this.sqlite.all('SELECT praesens FROM infinitivos', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterParticipio(): Promise<void>
  {
    this.sqlite.all('SELECT praesens FROM infinitivos', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterGerundio(): Promise<void>
  {
    this.sqlite.all('SELECT praesens FROM infinitivos', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterGerundivo(): Promise<void>
  {
    this.sqlite.all('SELECT praesens FROM infinitivos', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

}

