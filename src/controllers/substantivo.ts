/*************************************
* Controlador Repositório dos
* substantivos.
**************************************/

import * as sqlite3 from "sqlite3";
import { Request, Response } from "express";

import ITratadorConsulta from "../interfaces/TratadorConsulta";
import { IFormatadorErro } from "../interfaces/FormatadorErro";

export default class Substantivo
{

  protected sqlite: sqlite3.Database;
  protected httpRequest: Request;
  protected httpResponse: Response;
  protected tratadorConsultaSql: ITratadorConsulta;
  protected formatadorErro: IFormatadorErro;
  

  constructor( req: Request ,res: Response, tratadorConsultaSql: ITratadorConsulta,
             formatadorErro: IFormatadorErro )
  {
    this.httpRequest  = req;
    this.httpResponse = res;
    this.httpResponse.setHeader( 'Access-Control-Allow-Origin', '*' );
    this.tratadorConsultaSql = tratadorConsultaSql;
    this.formatadorErro = formatadorErro;

    this.sqlite = new sqlite3.Database( '../databases/substantivos.db', (err)=>
    {
      if ( err != null )
      {
        throw new Error( err.message );
      }
    });
  }

  public async todosOsSubstantivos(): Promise<void>
  {
    this.sqlite.all("SELECT noms, declinacao FROM substantivos", (err, linha)=>
    {
      if ( err ) this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err.message ) );
      else this.tratadorConsultaSql.tratarTipoConsultaSql( linha );
    });
  }

  public async umSubstantivo(): Promise<void>
  {
    const noms = this.httpRequest.query.noms ?? undefined;

    if ( typeof noms == "undefined" ) throw new Error( "QUERY STRING INVÁLIDA: consulte o manual da api" );
    else if ( typeof noms != "string" ) throw new Error( "QUERY STRING DE TIPO INVÁLIDO: consulte o manual da api" );

    this.sqlite.get("SELECT * FROM substantivos WHERE nomS = ?", noms, (err, linha)=>
    {
      if ( err ) this.httpResponse.json( this.formatadorErro.obterStringJSONDoErro( 500, err.message ) );
      else this.tratadorConsultaSql.tratarTipoConsultaSql( linha );
    });
  }
};

