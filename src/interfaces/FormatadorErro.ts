
export interface IFormatadorErro
{
  obterStringJSONDoErro( codigoRespostaHttp: number, erro: Error | string ): string;
};

