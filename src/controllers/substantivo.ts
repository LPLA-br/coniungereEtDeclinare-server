/*************************************
* Controlador Repositório dos
* substantivos.
**************************************/

import * as sqlite3 from "sqlite3";
import { Request, Response } from "express";

export default class Substantivo
{

  public sqlite: sqlite3.Database;
  public httpRequest: Request;
  public httpResponse: Response;

  constructor( req: Request ,res: Response  )
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
  }

  protected async tratarTipoConsultaSql( resultadoConsultae: any ): Promise<void>
  {
    if ( typeof resultadoConsultae == "object" )
    {
      this.httpResponse.send( JSON.stringify(resultadoConsultae) );
    }
    else if ( typeof resultadoConsultae == "string" )
    {
      this.httpResponse.send( resultadoConsultae );
    }
    else
    {
      this.httpResponse.send('{"erro":"resultado da consulta intratável"}');
    }
  }

  public async todosOsSubstantivos(): Promise<void>
  {
    this.sqlite.all("SELECT * FROM substantivos", (err, linha)=>
    {
      if ( err ) throw err;
      else this.tratarTipoConsultaSql( linha );
    });
  }

  public async umSubstantivo(): Promise<void>
  {
    const noms = this.httpRequest.query.noms ?? undefined;

    if ( typeof noms == "undefined" ) throw new Error( "QUERY STRING INVÁLIDA: consulte o manual da api" );
    else if ( typeof noms != "string" ) throw new Error( "QUERY STRING DE TIPO INVÁLIDO: consulte o manual da api" );

    this.sqlite.get("SELECT * FROM substantivos WHERE nomS = ?", noms, (err, linha)=>
    {
      if ( err ) throw err;
      else this.tratarTipoConsultaSql( linha );
    });
  }
};

