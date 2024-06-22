/**************************
 * Gera string json padronizada
 * de erro para o sistema
 *
 ***************************/
import { IFormatadorErro } from "../interfaces/FormatadorErro";

export default class FormatadorErro implements IFormatadorErro
{

  constructor()
  {}

  /** retorna string JSON com detalhes de erro HTTP semântico */
  public obterStringJSONDoErro( codigoRespostaHttp: number, erro: Error | string ): object
  {
    if ( typeof erro == "object" )
      return {"status":`${codigoRespostaHttp}`,"msg":`${erro.message}`};
    else if ( typeof erro == "string" )
      return {"status":`${codigoRespostaHttp}`,"msg":`${erro}`};
    else 
      return {"status":500,"mensagem":"FormatadorErro tipo de erro desconhecido"};
  }
}

