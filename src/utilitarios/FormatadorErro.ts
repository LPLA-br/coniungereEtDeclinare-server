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

  public obterStringJSONDoErro( codigoRespostaHttp: number, erro: Error | string ): string
  {
    if ( typeof erro == "object" )
      return `{"status":${codigoRespostaHttp},"mensagem":"${erro.message}"}`;
    else if ( typeof erro == "string" )
      return `{"status":${codigoRespostaHttp},"mensagem":"${erro}"}`;
    else 
      return '{"status":500,"mensagem":"FormatadorErro tipo de erro desconhecido"}';
  }
}

