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
   *  /verbos/infinitivos
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

  /** retorna todos os tempos do modo indicativo da voz ativa
   *  para um verbo indicado.
  * /verbos/indicativoativo?infinitivo=amare */
  public async obterIndicativoAtivo(): Promise<void>
  {
    const {infinitivo} = this.httpRequest.query;

    const consulta = "SELECT pessoas.* FROM verbos INNER JOIN \
    ativa ON verbos.voz_ativa = ativa.id INNER JOIN \
    indicativos ON ativa.indicativo = indicativos.id INNER JOIN \
    pessoas ON indicativos.praesens = pessoas.id OR indicativos.imperfectum = pessoas.id OR \
    indicativos.futurum = pessoas.id OR indicativos.perfectum = pessoas.id OR \
    indicativos.plusquamperfectum = pessoas.id OR indicativos.futurumperfectum = pessoas.id \
    WHERE verbos.infinitivo = ?"

    if ( typeof infinitivo == "undefined" )
    {
      throw new Error( this.formatadorErro.obterStringJSONDoErro( 400, "bad request" ) );
    }

    this.sqlite.all(consulta, infinitivo, (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  /** retorna todos os tempos do modo indicativo da voz ativa
   *  para um verbo indicado.
  *   /verbos/subjuntivoativo?infinitivo=amare */
  public async obterSubjuntivoPassivo(): Promise<void>
  {
    this.sqlite.all('', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterIndicativoPassivo(): Promise<void>
  {
    this.sqlite.all('', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterSubjuntivoAtivo(): Promise<void>
  {
    this.sqlite.all('', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }
 
  public async obterImperativo(): Promise<void>
  {
    this.sqlite.all('', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterParticipio(): Promise<void>
  {
    this.sqlite.all('', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterGerundio(): Promise<void>
  {
    this.sqlite.all('', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

  public async obterGerundivo(): Promise<void>
  {
    this.sqlite.all('', (err, linhas)=>
    {
      if ( err ) throw err;
      else this.httpResponse.send( linhas );
    });
  }

}

