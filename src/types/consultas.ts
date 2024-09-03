
const CONSULTAS = [
    "indicativoAtivoPresente"
  , "indicativoAtivoImperfeito"
  , "indicativoAtivoPerfeito"
  , "indicativoAtivoMaisQuePerfeito"
  , "indicativoAtivoFuturoPerfeito"
  , "indicativoAtivoFuturo"
  , "subjuntivoAtivoPresente"
  , "subjuntivoAtivoImperfeito"
  , "subjuntivoAtivoPerfeito"
  , "subjuntivoAtivoMaisQuePerfeito"
  , "indicativoPassivoPresente"
  , "indicativoPassivoImperfeito"
  , "indicativoPassivoPerfeito"
  , "indicativoPassivoMaisQuePerfeito"
  , "indicativoPassivoFuturoPerfeito"
  , "indicativoPassivoFuturo"
  , "subjuntivoPassivoPresente"
  , "subjuntivoPassivoImperfeito"
  , "subjuntivoPassivoPerfeito"
  , "subjuntivoPassivoMaisQuePerfeito"
] as const;

type Tupla = typeof CONSULTAS;
type consultas = Tupla[number];

export { CONSULTAS, consultas };
