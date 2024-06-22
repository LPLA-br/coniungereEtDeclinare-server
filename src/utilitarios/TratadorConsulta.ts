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

  /** Emite objeto de consulta ou de erro */
  public async tratarTipoConsultaSql( resultadoConsultae: any ): Promise<void>
  {
    if ( typeof resultadoConsultae == "object" )
    {
      this.httpResponse.json( { status: 200,res: resultadoConsultae } );
    }
    else if ( typeof resultadoConsultae == "string" )
    {
      this.httpResponse.json( {status: 200, res: resultadoConsultae } );
    }
    else
    {
      this.httpResponse.json( {status:500,erro:"resultado da consulta sql não é um objeto tratável"} );
    }
  }
}

