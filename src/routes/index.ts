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
  res.send( "API v0.2.6-alpha\n" );
});

export { router };
