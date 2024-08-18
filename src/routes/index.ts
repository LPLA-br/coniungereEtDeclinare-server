/*********************************
 * Núcleo das rotas da API
 * a ser incluso na aplicação
 *********************************/

import express from 'express';
import { substantivos } from './substantivos';
import { verbos } from './verbos';

const router = express.Router();

router.use( "/nome", substantivos );
router.use( "/verbos", verbos );

router.get('/', ( req: express.Request, res: express.Response, next: express.NextFunction )=>
{
  if ( typeof process.env.VERSAO == "string" )
    res.send( `API ${process.env.VERSAO}\n` );
  else
    res.send( "API versão indisponível" );
});

export { router };
