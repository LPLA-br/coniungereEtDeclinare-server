/*****************************
 * Trata tipo de retorno de
 * uma consulta sql e responde
 * devidamente
 *****************************/
import { Request, Response } from "express";

export default class TratadorConsultaSql
{

  protected httpRequest: Request;
  protected httpResponse: Response;

  constructor( req: Request, res: Response )
  {
    this.httpRequest  = req;
    this.httpResponse = res;
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
      this.httpResponse.send('{"status":500,"erro":"resultado da consulta intratável"}');
    }
  }
}

