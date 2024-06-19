/*****************************
 * Trata tipo de retorno de
 * uma consulta sql e responde
 * devidamente
 *****************************/
import { Request, Response } from "express";
import ITratadorConsulta from "../interfaces/TratadorConsulta";

/** Trata o resultado de uma consulta sqlite */
export default class TratadorConsultaSql implements ITratadorConsulta
{

  protected httpRequest: Request;
  protected httpResponse: Response;

  constructor( req: Request, res: Response )
  {
    this.httpRequest  = req;
    this.httpResponse = res;
  }

  public async tratarTipoConsultaSql( resultadoConsultae: any ): Promise<void>
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

