/************************
 * controlador dos verbos
 ************************/

import { Request, Response } from "express";
import * as sqlite3 from "sqlite3";

export default class Verbos
{

  public sqlite: sqlite3.Database;
  public httpRequest: Request;
  public httpResponse: Response;

  constructor( req: Request, res: Response )
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

  public async a(): Promise<void>
  {}

}

